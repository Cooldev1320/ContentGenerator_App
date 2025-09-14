import React from 'react';
import { SafeAreaView as RNSafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

interface SafeAreaProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

export default function SafeArea({ children, ...props }: SafeAreaProps) {
  return (
    <RNSafeAreaView {...props}>
      {children}
    </RNSafeAreaView>
  );
}
