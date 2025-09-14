import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginCredentials, RegisterData } from '../types/auth';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:5000'; // Use your API URL

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      async (config) => {
        const token = await this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.clearAuthToken();
          // Handle navigation to login screen
        }
        return Promise.reject(error);
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  private async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('Error setting auth token:', error);
    }
  }

  private async clearAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error clearing auth token:', error);
    }
  }

  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/login', credentials);
    
    if (response.data.success && response.data.data?.accessToken) {
      await this.setAuthToken(response.data.data.accessToken);
    }
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/api/auth/register', data);
    
    if (response.data.success && response.data.data?.accessToken) {
      await this.setAuthToken(response.data.data.accessToken);
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/api/auth/logout');
    } finally {
      await this.clearAuthToken();
    }
  }

  async getProfile(): Promise<any> {
    const response = await this.api.get('/api/auth/profile');
    return response.data;
  }

  // Template methods
  async getTemplates(params?: any): Promise<any> {
    const response = await this.api.get('/api/templates', { params });
    return response.data;
  }

  async getTemplate(id: string): Promise<any> {
    const response = await this.api.get(`/api/templates/${id}`);
    return response.data;
  }

  // Project methods
  async getProjects(params?: any): Promise<any> {
    const response = await this.api.get('/api/projects', { params });
    return response.data;
  }

  async createProject(data: any): Promise<any> {
    const response = await this.api.post('/api/projects', data);
    return response.data;
  }

  async updateProject(id: string, data: any): Promise<any> {
    const response = await this.api.put(`/api/projects/${id}`, data);
    return response.data;
  }

  async deleteProject(id: string): Promise<any> {
    const response = await this.api.delete(`/api/projects/${id}`);
    return response.data;
  }
}

export const apiService = new ApiService();
