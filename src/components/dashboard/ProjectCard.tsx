import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { formatDate } from '../../utils';

interface Project {
  id: string;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: string;
  updatedAt: string;
  templateId?: string;
}

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ 
  project, 
  onOpen, 
  onDuplicate, 
  onDelete 
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return '#22c55e';
      case 'Draft':
        return '#f59e0b';
      case 'Archived':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published':
        return '✅';
      case 'Draft':
        return '📝';
      case 'Archived':
        return '📁';
      default:
        return '📄';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onOpen}>
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        {project.thumbnailUrl ? (
          <Image
            source={{ uri: project.thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderIcon}>🎨</Text>
          </View>
        )}
        
        {/* Status Badge */}
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(project.status) }
        ]}>
          <Text style={styles.statusIcon}>
            {getStatusIcon(project.status)}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {project.name}
        </Text>
        
        {project.description && (
          <Text style={styles.description} numberOfLines={2}>
            {project.description}
          </Text>
        )}

        <View style={styles.meta}>
          <Text style={styles.date}>
            Updated {formatDate(project.updatedAt)}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDuplicate}
        >
          <Text style={styles.actionIcon}>📋</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={onDelete}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  placeholderThumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
    color: '#9ca3af',
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  deleteButton: {
    backgroundColor: '#fecaca',
  },
  actionIcon: {
    fontSize: 16,
  },
});
