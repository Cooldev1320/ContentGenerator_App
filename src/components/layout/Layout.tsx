import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  title?: string;
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = false,
  showSidebar = false,
  title,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuPress = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showHeader && (
        <Header
          title={title}
          onMenuPress={showSidebar ? handleMenuPress : undefined}
        />
      )}
      
      <View style={styles.content}>
        {children}
      </View>

      {showFooter && <Footer showFooter={showFooter} />}
      
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
        />
      )}
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
  },
});
