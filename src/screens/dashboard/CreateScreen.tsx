import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigator';
import Header from '../../components/layout/Header';
import { Button } from '../../components/ui/Button';

type CreateScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Create'>;

interface Props {
  navigation: CreateScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with margins

export function CreateScreen({ navigation }: Props) {
  const createOptions = [
    {
      title: 'Instagram Post',
      subtitle: '1080 x 1080 px',
      icon: '📱',
      color: '#e91e63',
    },
    {
      title: 'Instagram Story',
      subtitle: '1080 x 1920 px',
      icon: '📖',
      color: '#9c27b0',
    },
    {
      title: 'Facebook Post',
      subtitle: '1200 x 630 px',
      icon: '📘',
      color: '#1877f2',
    },
    {
      title: 'Twitter Post',
      subtitle: '1024 x 512 px',
      icon: '🐦',
      color: '#1da1f2',
    },
    {
      title: 'LinkedIn Post',
      subtitle: '1200 x 627 px',
      icon: '💼',
      color: '#0a66c2',
    },
    {
      title: 'Custom Size',
      subtitle: 'Your dimensions',
      icon: '📐',
      color: '#6b7280',
    },
  ];

  const handleCreateProject = (option: typeof createOptions[0]) => {
    // Navigate to editor with the selected format
    console.log('Creating project:', option.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Create New Design</Text>
          <Text style={styles.subtitle}>
            Choose a format to get started with your design
          </Text>
        </View>

        <View style={styles.quickStart}>
          <Text style={styles.sectionTitle}>Quick Start</Text>
          <TouchableOpacity
            style={styles.quickStartCard}
            onPress={() => navigation.navigate('Templates')}
          >
            <View style={styles.quickStartIcon}>
              <Text style={styles.quickStartIconText}>⚡</Text>
            </View>
            <View style={styles.quickStartContent}>
              <Text style={styles.quickStartTitle}>Start from Template</Text>
              <Text style={styles.quickStartDescription}>
                Browse our collection of professional templates
              </Text>
            </View>
            <View style={styles.quickStartArrow}>
              <Text style={styles.quickStartArrowText}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formatsSection}>
          <Text style={styles.sectionTitle}>Create from Scratch</Text>
          <View style={styles.formatsGrid}>
            {createOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.formatCard, { width: cardWidth }]}
                onPress={() => handleCreateProject(option)}
              >
                <View style={[styles.formatIcon, { backgroundColor: option.color + '20' }]}>
                  <Text style={styles.formatIconText}>{option.icon}</Text>
                </View>
                <Text style={styles.formatTitle}>{option.title}</Text>
                <Text style={styles.formatSubtitle}>{option.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Continue Recent</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>📁</Text>
            <Text style={styles.emptyStateTitle}>No recent projects</Text>
            <Text style={styles.emptyStateDescription}>
              Your recent projects will appear here
            </Text>
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
  content: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  quickStart: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  quickStartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickStartIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickStartIconText: {
    fontSize: 20,
  },
  quickStartContent: {
    flex: 1,
  },
  quickStartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  quickStartDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  quickStartArrow: {
    marginLeft: 8,
  },
  quickStartArrowText: {
    fontSize: 20,
    color: '#9ca3af',
  },
  formatsSection: {
    marginBottom: 32,
  },
  formatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  formatCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  formatIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  formatIconText: {
    fontSize: 24,
  },
  formatTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  formatSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 24,
  },
  emptyState: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});