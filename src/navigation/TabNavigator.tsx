import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { CreateScreen } from '../screens/dashboard/CreateScreen';
import { TemplatesScreen } from '../screens/dashboard/TemplatesScreen';
import { HistoryScreen } from '../screens/dashboard/HistoryScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';

export type TabParamList = {
  Dashboard: undefined;
  Create: undefined;
  Templates: undefined;
  History: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Icon components
function HomeIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: 24 }}>🏠</Text>
    </View>
  );
}

function CreateIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: 24 }}>➕</Text>
    </View>
  );
}

function TemplatesIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: 24 }}>📋</Text>
    </View>
  );
}

function HistoryIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: 24 }}>🕒</Text>
    </View>
  );
}

function SettingsIcon({ focused, color }: { focused: boolean; color: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color, fontSize: 24 }}>⚙️</Text>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: HomeIcon,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: CreateIcon,
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="Templates"
        component={TemplatesScreen}
        options={{
          tabBarIcon: TemplatesIcon,
          tabBarLabel: 'Templates',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: HistoryIcon,
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsIcon,
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}