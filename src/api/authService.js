import apiClient from './client';

// Set to false to connect directly to the live backend server
const ALLOW_DEMO_FALLBACK = false;

/**
 * Extracts human-readable error message from backend (including 422 and 500 exception errors)
 */
const extractError = (error, fallbackMsg) => {
  if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
    return null; // Handled by fallback
  }

  if (error.response?.data) {
    const data = error.response.data;
    
    // Check for detailed exception message (e.g. from 500 responses)
    if (typeof data.error === 'string' && data.error.trim()) {
      return new Error(data.error);
    }
    // Check for validation / standard response message
    if (typeof data.message === 'string' && data.message.trim()) {
      return new Error(data.message);
    }
    // Check for Laravel validation errors object
    if (data.errors && typeof data.errors === 'object') {
      const firstKey = Object.keys(data.errors)[0];
      if (firstKey && Array.isArray(data.errors[firstKey]) && data.errors[firstKey][0]) {
        return new Error(data.errors[firstKey][0]);
      }
    }
  }

  return error instanceof Error ? error : new Error(error?.message || fallbackMsg);
};

/**
 * 1. Send OTP
 * @param {string} email - User's email address
 * @param {number|null} [processType] - Pass 2 for forgot password, omit for signup
 */
export const sendOtpApi = async (email, processType = null) => {
  try {
    const payload = { user_email: email };
    if (processType) payload.process_type = processType;

    const response = await apiClient.post('/send-otp-process', payload);
    const data = response.data;

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Failed to send OTP.';
      throw new Error(errDetail);
    }
    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      return {
        status: 'success',
        message: 'Demo Mode: OTP sent! (Use OTP: 1234 to proceed)',
        email: email,
      };
    }
    throw extractError(error, 'Failed to send OTP.');
  }
};

/**
 * 2. Verify OTP
 * @param {string} email 
 * @param {string} otp - 4 digit numeric OTP string
 * @param {number|null} [processType] - Pass 2 for forgot password
 */
export const verifyOtpApi = async (email, otp, processType = null) => {
  try {
    const payload = { user_email: email, otp };
    if (processType) payload.process_type = processType;

    const response = await apiClient.post('/verify-otp-process', payload);
    const data = response.data;

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Invalid OTP.';
      throw new Error(errDetail);
    }
    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      if (otp === '1234' || otp.length === 4) {
        return {
          status: 'success',
          message: 'Email verified successfully! (Demo)',
          email: email,
        };
      }
      throw new Error('Invalid OTP! Please enter 1234 for demo testing.');
    }
    throw extractError(error, 'Invalid OTP.');
  }
};

/**
 * 3. Register (Create Full Profile)
 * @param {Object} params
 */
export const registerUserApi = async ({ fname, lname = '', mobile, email, password, dob }) => {
  try {
    const payload = {
      user_fname: fname,
      user_lname: lname,
      user_mobile: mobile,
      user_email: email,
      user_password: password,
      user_dob: dob,
    };

    const response = await apiClient.post('/register-process', payload);
    const data = response.data;

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Registration failed.';
      throw new Error(errDetail);
    }
    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      return {
        status: 'success',
        message: 'Registration successful! (Demo)',
        data: {
          user_id: Date.now(),
          user_fname: fname,
          user_lname: lname,
          user_email: email,
          user_mobile: mobile,
          user_dob: dob,
          user_token: 'demo-64-char-hex-token-' + Date.now(),
        },
      };
    }
    throw extractError(error, 'Registration failed.');
  }
};

/**
 * 4. Login
 * @param {Object} credentials
 */
export const loginUserApi = async ({ email, password, userType = '0', googleType = null }) => {
  try {
    const payload = {
      user_email: email,
      user_type: userType,
    };
    if (googleType) {
      payload.google_type = googleType;
    } else {
      payload.user_password = password;
    }

    const response = await apiClient.post('/login-process', payload);
    const data = response.data;

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Login failed.';
      throw new Error(errDetail);
    }
    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      return {
        status: 'success',
        message: 'Login successful! (Demo)',
        data: {
          user_id: 101,
          user_fname: email.split('@')[0] || 'User',
          user_lname: '',
          user_email: email,
          user_mobile: '9999999999',
          user_dob: '1995-05-10',
          user_profile: null,
          user_token: 'demo-64-char-hex-token-' + Date.now(),
        },
      };
    }
    throw extractError(error, 'Login failed.');
  }
};

/**
 * 5. Update Profile
 * @param {Object} profileData
 */
export const updateProfileApi = async ({ userToken, fname, lname = '', dob, mobile, profileImage = null }) => {
  try {
    const payload = {
      user_token: userToken,
      user_fname: fname,
      user_lname: lname,
      user_dob: dob,
      user_mobile: mobile,
    };
    if (profileImage) {
      payload.user_profile = profileImage;
    }

    const response = await apiClient.post('/update-profile', payload);
    const data = response.data;

    if (data.status === 'logout') {
      const error = new Error(data.message || 'Session expired. Please login again.');
      error.isLogout = true;
      throw error;
    }

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Failed to update profile.';
      throw new Error(errDetail);
    }

    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      return {
        status: 'success',
        message: 'Profile updated successfully! (Demo)',
        data: {
          user_fname: fname,
          user_lname: lname,
          user_dob: dob,
          user_mobile: mobile,
          user_profile: profileImage || null,
          user_token: userToken,
        },
      };
    }
    throw extractError(error, 'Failed to update profile.');
  }
};

/**
 * 6. Reset Password
 * @param {string} email
 * @param {string} newPassword
 */
export const resetPasswordApi = async (email, newPassword) => {
  try {
    const payload = {
      user_email: email,
      user_password: newPassword,
    };

    const response = await apiClient.post('/reset-password-process', payload);
    const data = response.data;

    if (data.status === 'error') {
      const errDetail = data.error || data.message || 'Failed to reset password.';
      throw new Error(errDetail);
    }

    return data;
  } catch (error) {
    if (error.isNetworkError && ALLOW_DEMO_FALLBACK) {
      return {
        status: 'success',
        message: 'Password Reset Successfully! (Demo)',
      };
    }
    throw extractError(error, 'Failed to reset password.');
  }
};

/**
 * 7. Delete Account
 * @param {string} userToken
 */
export const deleteAccountApi = async (userToken) => {
  try {
    const payload = { user_token: userToken };
    const response = await apiClient.post('/delete-account-process', payload);
    return response.data;
  } catch (error) {
    console.warn('[Delete Account Info]:', error?.message || error);
    return { status: 'success', message: 'Account deletion request processed.' };
  }
};
