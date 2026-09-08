import apiClient from './client';

export const getBanners = async () => {
  try {
    const response = await apiClient.get('/banners');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMachines = async (params = {}) => {
  try {
    const response = await apiClient.get('/machines', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMachineDetails = async (id) => {
  try {
    const response = await apiClient.get(`/machines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitInquiry = async (data) => {
  try {
    const response = await apiClient.post('/inquiry', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
