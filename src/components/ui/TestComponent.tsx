import React from 'react';
import { View, Text } from 'react-native';

export function TestComponent() {
  return (
    <View className="flex-1 bg-blue-500 p-4">
      <Text className="text-white text-xl font-bold">
        NativeWind Test - This should be blue background with white text
      </Text>
    </View>
  );
}
