import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import type { TemplateListDto } from '../../types';

interface TemplatePreviewProps {
  template: TemplateListDto;
  onSelect: (templateId: string) => void;
  onPreview?: (templateId: string) => void;
}

export default function TemplatePreview({ 
  template, 
  onSelect, 
  onPreview 
}: TemplatePreviewProps) {
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      'social': 'Social Media',
      'marketing': 'Marketing',
      'business': 'Business',
      'branding': 'Branding',
      'blank': 'Blank',
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'social': '#3b82f6',
      'marketing': '#10b981',
      'business': '#8b5cf6',
      'branding': '#f59e0b',
      'blank': '#6b7280',
    };
    return colors[category] || '#6b7280';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.thumbnailContainer}
        onPress={() => onPreview?.(template.id)}
      >
        {template.thumbnailUrl ? (
          <Image
            source={{ uri: template.thumbnailUrl }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderIcon}>🎨</Text>
          </View>
        )}
        
        {/* Premium Badge */}
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
        
        {/* Category Badge */}
        <View style={[
          styles.categoryBadge,
          { backgroundColor: getCategoryColor(template.category) }
        ]}>
          <Text style={styles.categoryText}>
            {getCategoryName(template.category)}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {template.name}
        </Text>
        
        <Text style={styles.description} numberOfLines={3}>
          {template.description}
        </Text>

        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaIcon}>📥</Text>
            <Text style={styles.metaText}>
              {template.downloadCount.toLocaleString()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => onSelect(template.id)}
        >
          <Text style={styles.selectButtonText}>
            {template.isPremium ? 'Upgrade to Use' : 'Use Template'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 160,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  placeholderThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    color: '#9ca3af',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaIcon: {
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  selectButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
