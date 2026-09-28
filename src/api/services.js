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
    return clientHomeData.data;
  }
};

export const getClientsData = async () => {
  try {
    const response = await apiClient.get('/clients');
    return response.data?.data || response.data;
  } catch (error) {
    // Fallback to local mock data on error (e.g. 404)
    return clientData.data;
  }
};

export const getServicesData = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data?.data || response.data;
  } catch (error) {
    // Fallback to local mock data on error (e.g. 404)
    return clientServiceData.data;
  }
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
    return { data: clientProductsData.data.products };
  }
};

export const getProducts = async (type, slug) => {
  try {
    const response = await apiClient.get(`/products/${type}/${slug}`);
    return response.data?.data || response.data;
  } catch (error) {
    return clientProductsData.data;
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

export const getAchievementsData = async () => {
  try {
    const response = await apiClient.get('/achievements');
    return response.data?.data || response.data;
  } catch (error) {
    const fallbackData = require('../constants/clientAchievementsData.json');
    return fallbackData.data;
  }
};

export const getPageData = async (slug) => {
  try {
    const response = await apiClient.get(`/pages-data/${slug}`);
    return response.data?.data?.getpagedetails || null;
  } catch (error) {
    throw error;
  }
};
