import apiClient from './client';
import clientHomeData from '../constants/clientHomeData.json';
import clientServiceData from '../constants/clientServiceData.json';
import clientData from '../constants/clientData.json';
import clientProductsData from '../constants/clientProductsData.json';
import clientProductDetailData from '../constants/clientProductDetailData.json';

export const getHomeData = async () => {
  try {
    const response = await apiClient.get('/home-data');
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientData.data);
    }, 500);
  });
};

export const getServicesData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(clientServiceData.data);
    }, 500);
  });
};

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

export const getProducts = async (type, slug) => {
  try {
    const response = await apiClient.get(`/products/${type}/${slug}`);
    return response.data?.data || response.data;
  } catch (error) {
    throw error;
  }
};

export const getMachineDetails = async (slug) => {
  try {
    const response = await apiClient.get(`/product/${slug}`);
    return response.data?.data || response.data;
  } catch (error) {
    // Fallback to local mock data on error (e.g. 404)
    return clientProductDetailData.data;
  }
};

export const submitInquiry = async (data) => {
  try {
    const response = await apiClient.post('/enquiry-process', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
