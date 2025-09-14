import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/authStore';
import { RegisterData } from '../../types/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onNavigateToLogin?: () => void;
}

export function RegisterForm({ 
  onSuccess, 
  onNavigateToLogin 
}: RegisterFormProps) {
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData) => {
    clearError();
    const success = await registerUser(data);
    
    if (success) {
      reset();
      onSuccess?.();
    } else if (error) {
      Alert.alert('Registration Failed', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us today</Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Input
                label="Username"
                placeholder="Choose a username"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize="none"
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.fullName?.message}
              />
            )}
          />

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
                value={value}
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
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Please confirm your password',
              validate: (value: any) =>
                value === password || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }: any) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <View style={styles.checkboxContainer}>
            <Controller
              control={control}
              name="acceptTerms"
              rules={{
                required: 'You must accept the terms and conditions',
              }}
              render={({ field: { onChange, value } }: any) => (
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => onChange(!value)}
                >
                  <View style={[styles.checkboxBox, value && styles.checkboxChecked]}>
                    {value && <Text style={styles.checkboxMark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxText}>
                    I agree to the Terms and Conditions
                  </Text>
                </TouchableOpacity>
              )}
            />
            {errors.acceptTerms && (
              <Text style={styles.errorText}>{errors.acceptTerms.message}</Text>
            )}
          </View>
        </View>

        <Button
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}
          style={styles.submitButton}
        >
          Create Account
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={onNavigateToLogin}>
            <Text style={styles.linkText}>Sign in</Text>
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
    fontSize: 12,
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 24,
  },
  checkboxContainer: {
    marginTop: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkboxMark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
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