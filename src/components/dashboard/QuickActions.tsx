import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

export default function QuickActions() {
  const navigation = useNavigation();

  const actions: QuickAction[] = [
    {
      id: 'create',
      title: 'Create Project',
      icon: '➕',
      color: '#3b82f6',
      onPress: () => navigation.navigate('Create' as never),
    },
    {
      id: 'templates',
      title: 'Browse Templates',
      icon: '🎨',
      color: '#8b5cf6',
      onPress: () => navigation.navigate('Templates' as never),
    },
    {
      id: 'import',
      title: 'Import Image',
      icon: '📷',
      color: '#10b981',
      onPress: () => {
        // TODO: Implement image import
        console.log('Import image');
      },
    },
    {
      id: 'export',
      title: 'Export Project',
      icon: '📤',
      color: '#f59e0b',
      onPress: () => {
        // TODO: Implement export
        console.log('Export project');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, { backgroundColor: action.color }]}
            onPress={action.onPress}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: 120,
    height: 100,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
