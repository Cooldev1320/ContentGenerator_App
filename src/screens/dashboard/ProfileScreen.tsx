import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigator';
import { Header } from '../../components/layout/Header';
import { useAuthStore } from '../../store/authStore';

type ProfileScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export function ProfileScreen({ navigation }: Props) {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        },
      ]
    );
  };

  const profileSections = [
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: '✏️', onPress: () => console.log('Edit profile') },
        { label: 'Change Password', icon: '🔒', onPress: () => console.log('Change password') },
        { label: 'Subscription', icon: '💎', onPress: () => console.log('Subscription') },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Notifications', icon: '🔔', onPress: () => console.log('Notifications') },
        { label: 'Export Quality', icon: '📸', onPress: () => console.log('Export quality') },
        { label: 'Auto-save', icon: '💾', onPress: () => console.log('Auto-save') },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', icon: '❓', onPress: () => console.log('Help center') },
        { label: 'Contact Support', icon: '📧', onPress: () => console.log('Contact support') },
        { label: 'Rate App', icon: '⭐', onPress: () => console.log('Rate app') },
      ],
    },
  ];

  const getSubscriptionBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Premium':
        return '#f59e0b';
      case 'Pro':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user?.fullName || user?.username}
            </Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            
            <View style={styles.subscriptionContainer}>
              <View
                style={[
                  styles.subscriptionBadge,
                  { backgroundColor: getSubscriptionBadgeColor(user?.subscriptionTier || 'Free') + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.subscriptionText,
                    { color: getSubscriptionBadgeColor(user?.subscriptionTier || 'Free') },
                  ]}
                >
                  {user?.subscriptionTier || 'Free'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Usage Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {user?.monthlyExportsUsed || 0}
            </Text>
            <Text style={styles.statLabel}>Exports Used</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {user?.monthlyExportsLimit || 5}
            </Text>
            <Text style={styles.statLabel}>Monthly Limit</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Projects</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.sectionItem}
                  onPress={item.onPress}
                >
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                    <Text style={styles.itemLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.itemArrow}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>ContentGen v1.0.0</Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  subscriptionContainer: {
    marginTop: 8,
  },
  subscriptionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subscriptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sectionItems: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    color: '#111827',
  },
  itemArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});