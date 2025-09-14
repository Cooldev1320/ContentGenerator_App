// Re-export all types
export * from './auth';
export * from './api';
export * from './template';
export * from './project';
export * from './fabric';
export * from './navigation';

// Canvas types (avoiding duplicate exports)
export type { CanvasState, CanvasElement } from './canvas';

// Common types
export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  subscriptionTier: 'Free' | 'Premium' | 'Pro';
  monthlyExportsUsed: number;
  monthlyExportsLimit: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName?: string;
  acceptTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
    refreshToken: string;
  };
}

export interface HistoryItem {
  id: string;
  userId: string;
  projectId?: string;
  actionType: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}
