import apiClient from './apiClient';
import type { LoginCredentials, AdminData } from '../types/auth';

export const loginAdmin = async (credentials: LoginCredentials) => {
  const response = await apiClient.post('/admin/login', credentials);
  return response.data;
};

export const createAdmin = async (adminData: AdminData) => {
  const response = await apiClient.post('/admin/create', adminData);
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await apiClient.get('/admin/profile');
  return response.data;
};
