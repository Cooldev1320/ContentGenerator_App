import { Platform } from 'react-native';

export const config = {
  // Only API connection needed - your .NET backend handles Supabase
  API_URL: __DEV__ 
    ? Platform.OS === 'ios' 
      ? 'http://localhost:5000' 
      : 'http://10.0.2.2:5000' // Android emulator
    : 'https://your-production-api.com',
};