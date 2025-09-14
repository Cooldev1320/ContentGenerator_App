import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { StorageService } from '../../services';

interface SettingsData {
  notifications: {
    email: boolean;
    push: boolean;
    projectUpdates: boolean;
  };
  privacy: {
    profileVisibility: boolean;
    showEmail: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    autoSave: boolean;
  };
}

export default function SettingsScreen() {
  const { user, logout } = useAuthStore();
  const [settings, setSettings] = useState<SettingsData>({
    notifications: {
      email: true,
      push: true,
      projectUpdates: true,
    },
    privacy: {
      profileVisibility: true,
      showEmail: false,
    },
    preferences: {
      theme: 'light',
      language: 'en',
      autoSave: true,
    },
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await StorageService.getItem('userSettings');
      if (storedSettings) {
        setSettings(storedSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: SettingsData) => {
    try {
      await StorageService.setItem('userSettings', newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleToggle = (category: keyof SettingsData, key: string) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !(settings[category] as any)[key],
      },
    };
    saveSettings(newSettings);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    value, 
    onToggle, 
    type = 'switch' 
  }: {
    title: string;
    subtitle?: string;
    value: boolean;
    onToggle: () => void;
    type?: 'switch' | 'button';
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {type === 'switch' ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
          thumbColor={value ? '#ffffff' : '#f3f4f6'}
        />
      ) : (
        <TouchableOpacity onPress={onToggle} style={styles.button}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </Text>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>
                  {user?.fullName || 'User'}
                </Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <Text style={styles.profileTier}>
                  {user?.subscriptionTier || 'Free'} Plan
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Email Notifications"
              subtitle="Receive updates via email"
              value={settings.notifications.email}
              onToggle={() => handleToggle('notifications', 'email')}
            />
            <SettingItem
              title="Push Notifications"
              subtitle="Receive push notifications"
              value={settings.notifications.push}
              onToggle={() => handleToggle('notifications', 'push')}
            />
            <SettingItem
              title="Project Updates"
              subtitle="Get notified about project changes"
              value={settings.notifications.projectUpdates}
              onToggle={() => handleToggle('notifications', 'projectUpdates')}
            />
          </View>
        </View>

        {/* Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Profile Visibility"
              subtitle="Make your profile visible to others"
              value={settings.privacy.profileVisibility}
              onToggle={() => handleToggle('privacy', 'profileVisibility')}
            />
            <SettingItem
              title="Show Email"
              subtitle="Display email in your profile"
              value={settings.privacy.showEmail}
              onToggle={() => handleToggle('privacy', 'showEmail')}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              title="Auto Save"
              subtitle="Automatically save your work"
              value={settings.preferences.autoSave}
              onToggle={() => handleToggle('preferences', 'autoSave')}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  profileTier: {
    fontSize: 14,
    color: '#3b82f6',
    marginTop: 4,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
