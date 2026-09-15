import React, { createContext, useContext, useState, useEffect } from 'react';
import safeStorage from '../utils/storage';
import { loginUserApi, registerUserApi, updateProfileApi } from '../api/authService';

const AuthContext = createContext();

const TOKEN_KEY = '@user_token';
const USER_KEY = '@user_data';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved session on app launch
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await safeStorage.getItem(TOKEN_KEY);
      const storedUser = await safeStorage.getItem(USER_KEY);
      if (storedToken && storedUser) {
        setUserToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.warn('Could not load stored auth session:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuthSession = async (token, userData) => {
    try {
      setUserToken(token);
      setUser(userData);
      await safeStorage.setItem(TOKEN_KEY, token);
      await safeStorage.setItem(USER_KEY, JSON.stringify(userData));
    } catch (e) {
      console.warn('Could not save auth session:', e);
    }
  };

  const login = async ({ email, password, userType = '0', googleType = null }) => {
    const response = await loginUserApi({ email, password, userType, googleType });
    const userData = response.data;
    const token = userData?.user_token;
    if (token) {
      await saveAuthSession(token, userData);
    }
    return response;
  };

  const register = async (registerData) => {
    const response = await registerUserApi(registerData);
    const userData = response.data;
    const token = userData?.user_token;
    if (token) {
      await saveAuthSession(token, userData);
    }
    return response;
  };

  const logout = async () => {
    try {
      setUser(null);
      setUserToken(null);
      await safeStorage.removeItem(TOKEN_KEY);
      await safeStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn('Could not clear auth session:', e);
    }
  };

  const updateProfileData = async ({ fname, lname, dob, mobile, profileImage }) => {
    if (!userToken) throw new Error('No user token found');

    const response = await updateProfileApi({
      userToken,
      fname,
      lname,
      dob,
      mobile,
      profileImage,
    });

    const updatedData = response.data || {};
    const newToken = updatedData?.user_token || userToken;
    const mergedUser = {
      ...user,
      user_fname: fname,
      user_lname: lname,
      user_dob: dob,
      user_mobile: mobile,
      ...(profileImage ? { user_profile: profileImage } : {}),
      ...(typeof updatedData === 'object' ? updatedData : {}),
    };

    await saveAuthSession(newToken, mergedUser);
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userToken,
        isLoggedIn: !!userToken,
        isLoading,
        login,
        register,
        logout,
        updateProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
