import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md', 
  style 
}: BadgeProps) {
  const badgeStyle = [
    styles.badge,
    styles[variant],
    styles[`${size}Size`],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  default: {
    backgroundColor: '#f3f4f6',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  warning: {
    backgroundColor: '#fef3c7',
  },
  error: {
    backgroundColor: '#fee2e2',
  },
  info: {
    backgroundColor: '#dbeafe',
  },
  smSize: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  mdSize: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lgSize: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  defaultText: {
    color: '#374151',
  },
  successText: {
    color: '#166534',
  },
  warningText: {
    color: '#92400e',
  },
  errorText: {
    color: '#dc2626',
  },
  infoText: {
    color: '#1d4ed8',
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
  lgText: {
    fontSize: 14,
  },
});
