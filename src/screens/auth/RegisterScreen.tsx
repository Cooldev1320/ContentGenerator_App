import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const handleRegisterSuccess = () => {
    // Navigation is handled by the root navigator based on auth state
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm
        onSuccess={handleRegisterSuccess}
        onNavigateToLogin={handleNavigateToLogin}
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