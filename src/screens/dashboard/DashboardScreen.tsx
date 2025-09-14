import React, { useEffect, useState } from 'react';
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
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuthStore } from '../../store/authStore';

type DashboardScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

export function DashboardScreen({ navigation }: Props) {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock data matching web app
  const [stats] = useState({
    totalProjects: 12,
    activeProjects: 3,
    templatesUsed: 8,
    totalExports: 24,
  });

  const [recentProjects] = useState([
    {
      id: '1',
      name: 'Social Media Campaign',
      status: 'active',
      lastModified: '2 hours ago',
      template: 'Instagram Post',
    },
    {
      id: '2',
      name: 'Product Launch Banner',
      status: 'completed',
      lastModified: '1 day ago',
      template: 'Banner Design',
    },
    {
      id: '3',
      name: 'Email Newsletter',
      status: 'draft',
      lastModified: '3 days ago',
      template: 'Email Template',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981'; // green
      case 'completed':
        return '#3b82f6'; // blue
      case 'draft':
        return '#f59e0b'; // yellow
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Welcome back! Here's what's happening with your content projects.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statCardContent}>
              <View style={[styles.statIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={[styles.statIconText, { color: '#2563eb' }]}>📄</Text>
              </View>
              <View style={styles.statText}>
                <Text style={styles.statLabel}>Total Projects</Text>
                <Text style={styles.statValue}>{stats.totalProjects}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statCardContent}>
              <View style={[styles.statIcon, { backgroundColor: '#dcfce7' }]}>
                <Text style={[styles.statIconText, { color: '#16a34a' }]}>⚡</Text>
              </View>
              <View style={styles.statText}>
                <Text style={styles.statLabel}>Active Projects</Text>
                <Text style={styles.statValue}>{stats.activeProjects}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statCardContent}>
              <View style={[styles.statIcon, { backgroundColor: '#f3e8ff' }]}>
                <Text style={[styles.statIconText, { color: '#9333ea' }]}>📋</Text>
              </View>
              <View style={styles.statText}>
                <Text style={styles.statLabel}>Templates Used</Text>
                <Text style={styles.statValue}>{stats.templatesUsed}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statCardContent}>
              <View style={[styles.statIcon, { backgroundColor: '#fed7aa' }]}>
                <Text style={[styles.statIconText, { color: '#ea580c' }]}>📤</Text>
              </View>
              <View style={styles.statText}>
                <Text style={styles.statLabel}>Total Exports</Text>
                <Text style={styles.statValue}>{stats.totalExports}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Create')}
            >
              <Text style={styles.actionButtonIcon}>➕</Text>
              <Text style={styles.actionButtonText}>Create New Project</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() => navigation.navigate('Templates')}
            >
              <Text style={styles.actionButtonIcon}>📋</Text>
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>Browse Templates</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.actionButtonIcon}>🕒</Text>
              <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>View History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Projects */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Projects</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.projectsList}>
            {recentProjects.map((project) => (
              <Card key={project.id} style={styles.projectCard}>
                <View style={styles.projectContent}>
                  <View style={styles.projectInfo}>
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectName}>{project.name}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) + '20' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
                          {project.status}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.projectDetails}>
                      Template: {project.template} • Last modified: {project.lastModified}
                    </Text>
                  </View>
                  <View style={styles.projectActions}>
                    <TouchableOpacity style={styles.projectAction}>
                      <Text style={styles.projectActionIcon}>👁️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectAction}>
                      <Text style={styles.projectActionIcon}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.projectAction}>
                      <Text style={styles.projectActionIcon}>📤</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
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
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 24,
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statIconText: {
    fontSize: 16,
  },
  statText: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  actionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  actionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: '45%',
  },
  actionButtonSecondary: {
    backgroundColor: '#6b7280',
  },
  actionButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  actionButtonTextSecondary: {
    color: '#ffffff',
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionLink: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  projectsList: {
    gap: 16,
  },
  projectCard: {
    padding: 24,
  },
  projectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  projectInfo: {
    flex: 1,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  projectDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  projectActions: {
    flexDirection: 'row',
    gap: 8,
  },
  projectAction: {
    padding: 8,
  },
  projectActionIcon: {
    fontSize: 16,
  },
});