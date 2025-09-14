import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProjectCard, QuickActions } from '../../components/dashboard';
import { useAuthStore } from '../../store/authStore';
import { StorageService } from '../../services';
import type { Project } from '../../types';

export default function ProjectsScreen() {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const storedProjects = await StorageService.getItem('projects') || [];
      setProjects(storedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  };

  const handleCreateProject = () => {
    (navigation as any).navigate('Create');
  };

  const handleOpenProject = (projectId: string) => {
    (navigation as any).navigate('Editor', { projectId });
  };

  const handleDuplicateProject = async (projectId: string) => {
    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        name: `${project.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updatedProjects = [newProject, ...projects];
      await StorageService.setItem('projects', updatedProjects);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error duplicating project:', error);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedProjects = projects.filter(p => p.id !== projectId);
              await StorageService.setItem('projects', updatedProjects);
              setProjects(updatedProjects);
            } catch (error) {
              console.error('Error deleting project:', error);
            }
          },
        },
      ]
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🎨</Text>
      <Text style={styles.emptyTitle}>No Projects Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first project to get started with content generation
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
        <Text style={styles.createButtonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
          <Text style={styles.createButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {projects.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <QuickActions />
            <View style={styles.projectsGrid}>
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => handleOpenProject(project.id)}
                  onDuplicate={() => handleDuplicateProject(project.id)}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  createButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  projectsGrid: {
    padding: 16,
    gap: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
});
