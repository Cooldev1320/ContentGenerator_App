import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProjectCard from './ProjectCard';
import { StorageService } from '../../services';
import type { Project } from '../../types';

export default function RecentProjects() {
  const navigation = useNavigation();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadRecentProjects();
  }, []);

  const loadRecentProjects = async () => {
    try {
      const projects = await StorageService.getItem('projects') || [];
      // Sort by updatedAt and take the most recent ones
      const sortedProjects = projects
        .sort((a: Project, b: Project) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      
      setRecentProjects(sortedProjects);
    } catch (error) {
      console.error('Error loading recent projects:', error);
    }
  };

  const handleOpenProject = (projectId: string) => {
    (navigation as any).navigate('Editor', { projectId });
  };

  const handleDuplicateProject = async (projectId: string) => {
    try {
      const project = recentProjects.find(p => p.id === projectId);
      if (!project) return;

      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        name: `${project.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const projects = await StorageService.getItem('projects') || [];
      const updatedProjects = [newProject, ...projects];
      await StorageService.setItem('projects', updatedProjects);
      
      // Reload recent projects
      loadRecentProjects();
    } catch (error) {
      console.error('Error duplicating project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const projects = await StorageService.getItem('projects') || [];
      const updatedProjects = projects.filter((p: Project) => p.id !== projectId);
      await StorageService.setItem('projects', updatedProjects);
      
      // Reload recent projects
      loadRecentProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const displayedProjects = showAll ? recentProjects : recentProjects.slice(0, 3);

  if (recentProjects.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recent Projects</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyTitle}>No Recent Projects</Text>
          <Text style={styles.emptySubtitle}>
            Create your first project to see it here
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Projects</Text>
        {recentProjects.length > 3 && (
          <TouchableOpacity onPress={() => setShowAll(!showAll)}>
            <Text style={styles.showMoreButton}>
              {showAll ? 'Show Less' : `Show All (${recentProjects.length})`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedProjects.map((project) => (
          <View key={project.id} style={styles.projectCard}>
            <ProjectCard
              project={project}
              onOpen={() => handleOpenProject(project.id)}
              onDuplicate={() => handleDuplicateProject(project.id)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  showMoreButton: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  projectCard: {
    width: 280,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
