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
  onNavigateToLogin: () => void;
}

export function RegisterForm({ onSuccess, onNavigateToLogin }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { register, isLoading, error, clearError } = useAuthStore();

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    const success = await register({
      username: username.trim(),
      email: email.trim(),
      password,
      confirmPassword,
      fullName: fullName.trim() || undefined,
      acceptTerms,
    });

    if (success) {
      onSuccess();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
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
          label="Username *"
          value={username}
          onChangeText={setUsername}
          placeholder="Choose a username"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          label="Email *"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Input
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name (optional)"
        />

        <Input
          label="Password *"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
        />

        <Input
          label="Confirm Password *"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <View style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}>
            {acceptTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the Terms of Service and Privacy Policy
          </Text>
        </TouchableOpacity>

        <Button
          onPress={handleRegister}
          isLoading={isLoading}
          style={styles.registerButton}
        >
          Create Account
        </Button>
      </Card>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={styles.footerLink}>Sign in</Text>
        </TouchableOpacity>
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  registerButton: {
    marginTop: 8,
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
});
