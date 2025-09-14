import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { LoginCredentials } from '../../types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
  onNavigateToRegister?: () => void;
}

export function LoginForm({ 
  onSuccess, 
  onNavigateToRegister 
}: LoginFormProps) {
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    clearError();
    const success = await login(data);
    
    if (success) {
      reset();
      onSuccess?.();
    } else if (error) {
      Alert.alert('Login Failed', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          style={styles.submitButton}
        >
          Sign In
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 24,
  },
  submitButton: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  linkText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
});