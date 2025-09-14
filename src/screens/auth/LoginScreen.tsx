import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginForm } from '../../components/auth/LoginForm';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const handleLoginSuccess = () => {
    // Navigation is handled by the root navigator based on auth state
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginForm
        onSuccess={handleLoginSuccess}
        onNavigateToRegister={handleNavigateToRegister}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});