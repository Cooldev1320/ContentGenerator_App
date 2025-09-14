import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useAuthStore } from '../../store/authStore';

interface Props {
  onSuccess: () => void;
  onNavigateToRegister: () => void;
}

export function LoginForm({ onSuccess, onNavigateToRegister }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const success = await login({ email: email.trim(), password });
    if (success) {
      onSuccess();
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@example.com');
    setPassword('anypassword');
    const success = await login({ email: 'demo@example.com', password: 'anypassword' });
    if (success) {
      onSuccess();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </View>

      <Card style={styles.formCard}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={clearError} style={styles.errorClose}>
              <Text style={styles.errorCloseText}>×</Text>
            </TouchableOpacity>
          </View>
        )}

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button
          onPress={handleLogin}
          isLoading={isLoading}
          style={styles.loginButton}
        >
          Sign In
        </Button>

        <TouchableOpacity
          onPress={handleDemoLogin}
          style={styles.demoButton}
          disabled={isLoading}
        >
          <Text style={styles.demoButtonText}>Try Demo Account</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onNavigateToRegister}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoInfo}>
        <Text style={styles.demoInfoTitle}>Quick Demo:</Text>
        <Text style={styles.demoInfoText}>Use any email and password</Text>
        <Text style={styles.demoInfoText}>Or tap "Try Demo Account" above</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  formCard: {
    padding: 24,
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    flex: 1,
  },
  errorClose: {
    marginLeft: 8,
  },
  errorCloseText: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 12,
  },
  demoButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  demoButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 16,
  },
  footerLink: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  demoInfo: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  demoInfoText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
});
