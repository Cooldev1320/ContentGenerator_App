import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: '🏠',
      route: 'Dashboard',
    },
    {
      id: 'templates',
      title: 'Templates',
      icon: '🎨',
      route: 'Templates',
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '📁',
      route: 'Projects',
    },
    {
      id: 'create',
      title: 'Create',
      icon: '➕',
      route: 'Create',
    },
    {
      id: 'history',
      title: 'History',
      icon: '📜',
      route: 'History',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      route: 'Settings',
    },
  ];

  const handleNavigation = (route: string) => {
    navigation.navigate(route as never);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Content Generator</Text>
          <Text style={styles.footerVersion}>v1.0.0</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  menuTitle: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  footerVersion: {
    fontSize: 12,
    color: '#6b7280',
  },
});
