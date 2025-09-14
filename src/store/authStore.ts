import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginCredentials, RegisterData, SubscriptionTier } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mockUsers: User[];
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      mockUsers: [
        {
          id: '1',
          username: 'demo_user',
          email: 'demo@example.com',
          fullName: 'Demo User',
          subscriptionTier: SubscriptionTier.Free,
          monthlyExportsUsed: 3,
          monthlyExportsLimit: 5,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          username: 'test_user',
          email: 'test@example.com',
          fullName: 'Test User',
          subscriptionTier: SubscriptionTier.Pro,
          monthlyExportsUsed: 12,
          monthlyExportsLimit: 50,
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ],

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { mockUsers } = get();
        
        // Check if user exists in mock data
        let user = mockUsers.find(u => u.email === credentials.email);
        
        // If user doesn't exist, create a new one (like web app)
        if (!user) {
          user = {
            id: Date.now().toString(),
            username: credentials.email.split('@')[0],
            email: credentials.email,
            fullName: credentials.email.split('@')[0],
            subscriptionTier: SubscriptionTier.Free,
            monthlyExportsUsed: 0,
            monthlyExportsLimit: 5,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          
          // Add to mock users
          set({ mockUsers: [...mockUsers, user] });
        }
        
        // Accept any password (like web app)
        set({
          user: user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { mockUsers } = get();
        
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === data.email);
        if (existingUser) {
          set({
            isLoading: false,
            error: 'User with this email already exists',
          });
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          username: data.username,
          email: data.email,
          fullName: data.fullName || data.username,
          subscriptionTier: SubscriptionTier.Free,
          monthlyExportsUsed: 0,
          monthlyExportsLimit: 5,
          isActive: true,
          createdAt: new Date().toISOString(),
        };
        
        // Add to mock users
        set({ mockUsers: [...mockUsers, newUser] });
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      },

      logout: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),

      loadUser: async () => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check if user is already stored (from persistence)
        const currentState = get();
        if (currentState.user && currentState.isAuthenticated) {
          set({ isLoading: false });
          return;
        }
        
        // No user found
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        mockUsers: state.mockUsers,
      }),
    }
  )
);