import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigator';
import Header from '../../components/layout/Header';

type HistoryScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'History'>;

interface Props {
  navigation: HistoryScreenNavigationProp;
}

interface HistoryItem {
  id: string;
  title: string;
  action: string;
  date: string;
  thumbnail: string;
  status: 'completed' | 'draft' | 'exported';
}

export function HistoryScreen({ navigation }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Completed', 'Draft', 'Exported'];

  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: 'Instagram Post - Product Launch',
      action: 'Created project',
      date: '2 hours ago',
      thumbnail: '📱',
      status: 'draft',
    },
    {
      id: '2',
      title: 'Facebook Banner - Summer Sale',
      action: 'Exported to JPG',
      date: '1 day ago',
      thumbnail: '📘',
      status: 'exported',
    },
    {
      id: '3',
      title: 'Twitter Header - Brand Update',
      action: 'Updated design',
      date: '3 days ago',
      thumbnail: '🐦',
      status: 'completed',
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'draft':
        return '#f59e0b';
      case 'exported':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'draft':
        return 'Draft';
      case 'exported':
        return 'Exported';
      default:
        return 'Unknown';
    }
  };

  const filteredItems = selectedFilter === 'All' 
    ? historyItems 
    : historyItems.filter(item => getStatusText(item.status) === selectedFilter);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Project History</Text>
          <Text style={styles.subtitle}>
            Track your design projects and activities
          </Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* History List */}
        <ScrollView
          style={styles.historyContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredItems.length > 0 ? (
            <View style={styles.historyList}>
              {filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.historyCard}
                  onPress={() => {
                    console.log('Open project:', item.title);
                  }}
                >
                  <View style={styles.historyThumbnail}>
                    <Text style={styles.historyThumbnailText}>{item.thumbnail}</Text>
                  </View>
                  
                  <View style={styles.historyContent}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <Text style={styles.historyAction}>{item.action}</Text>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                  
                  <View style={styles.historyStatus}>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(item.status) + '20' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(item.status) },
                        ]}
                      >
                        {getStatusText(item.status)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📂</Text>
              <Text style={styles.emptyStateTitle}>No projects found</Text>
              <Text style={styles.emptyStateDescription}>
                {selectedFilter === 'All' 
                  ? 'Start creating to see your project history'
                  : `No ${selectedFilter.toLowerCase()} projects found`
                }
              </Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate('Create')}
              >
                <Text style={styles.emptyStateButtonText}>Create Project</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
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
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingRight: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  historyContainer: {
    flex: 1,
  },
  historyList: {
    gap: 12,
  },
  historyCard: {
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
  historyThumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyThumbnailText: {
    fontSize: 20,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  historyAction: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  historyStatus: {
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});