import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface TabBarProps {
  tabs: Array<{
    id: string;
    title: string;
    icon: string;
    isActive: boolean;
  }>;
  onTabPress: (tabId: string) => void;
}

export default function TabBar({ tabs, onTabPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, tab.isActive && styles.activeTab]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[styles.tabIcon, tab.isActive && styles.activeTabIcon]}>
            {tab.icon}
          </Text>
          <Text style={[styles.tabTitle, tab.isActive && styles.activeTabTitle]}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#f3f4f6',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeTabIcon: {
    color: '#3b82f6',
  },
  tabTitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  activeTabTitle: {
    color: '#3b82f6',
    fontWeight: '600',
  },
});
