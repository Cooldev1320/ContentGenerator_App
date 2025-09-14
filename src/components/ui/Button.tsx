import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  children: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[`${size}Size`],
    (disabled || isLoading) && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#ffffff' : '#3b82f6'}
          style={styles.loader}
        />
      )}
      <Text style={textStyles}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primary: {
    backgroundColor: '#3b82f6',
  },
  secondary: {
    backgroundColor: '#6b7280',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  smSize: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mdSize: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lgSize: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: '#374151',
  },
  ghostText: {
    color: '#374151',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  loader: {
    marginRight: 8,
  },
});