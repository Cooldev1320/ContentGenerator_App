// Same as Next.js - exact copy
export interface User {
    id: string;
    username: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    subscriptionTier: SubscriptionTier;
    subscriptionExpiresAt?: string;
    monthlyExportsUsed: number;
    monthlyExportsLimit: number;
    isActive: boolean;
    createdAt: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
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
    message?: string;
    data?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: string;
      user: User;
    };
    errors?: string[];
  }
  
  export enum SubscriptionTier {
    Free = 'Free',
    Pro = 'Pro',
    Premium = 'Premium'
  }