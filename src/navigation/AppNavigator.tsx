import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isAuthenticated, loadUser, isLoading } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return null; // Add a proper loading screen here
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};