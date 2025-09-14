import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';

function Header() {
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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.leftSection}>
            <Text style={styles.appName}>ContentGen</Text>
          </View>
          
          <View style={styles.rightSection}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                // Add search functionality
              }}
            >
              <Text style={styles.searchIcon}>🔍</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.profileButton}
              onPress={handleLogout}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(user?.fullName || user?.username || 'U').charAt(0).toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingTop: StatusBar.currentHeight || 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  leftSection: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 16,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Header;