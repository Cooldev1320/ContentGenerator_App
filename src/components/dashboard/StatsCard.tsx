import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export default function StatsCard({ 
  title, 
  value, 
  icon = '📊', 
  trend, 
  color = 'blue' 
}: StatsCardProps) {
  const colorStyles = {
    blue: {
      background: '#dbeafe',
      icon: '#3b82f6',
      value: '#1e40af',
    },
    green: {
      background: '#dcfce7',
      icon: '#22c55e',
      value: '#15803d',
    },
    purple: {
      background: '#e9d5ff',
      icon: '#8b5cf6',
      value: '#6d28d9',
    },
    orange: {
      background: '#fed7aa',
      icon: '#f97316',
      value: '#ea580c',
    },
  };

  const currentColor = colorStyles[color];

  return (
    <View style={[styles.container, { backgroundColor: currentColor.background }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.icon}>{icon}</Text>
          {trend && (
            <View style={[
              styles.trend,
              { backgroundColor: trend.isPositive ? '#dcfce7' : '#fecaca' }
            ]}>
              <Text style={[
                styles.trendText,
                { color: trend.isPositive ? '#15803d' : '#dc2626' }
              ]}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Text>
            </View>
          )}
        </View>
        
        <Text style={[styles.value, { color: currentColor.value }]}>
          {value}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
  },
  trend: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});
