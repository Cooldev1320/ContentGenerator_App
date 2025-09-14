import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Modal } from '../ui/Modal';
import type { TemplateListDto } from '../../types';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
  templates: TemplateListDto[];
  isLoading?: boolean;
}

export default function TemplateSelector({
  isOpen,
  onClose,
  onSelectTemplate,
  templates,
  isLoading = false,
}: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
    }
  };

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

  const renderTemplateCard = (template: TemplateListDto) => (
    <TouchableOpacity
      key={template.id}
      style={[
        styles.templateCard,
        selectedTemplate === template.id && styles.selectedTemplateCard,
      ]}
      onPress={() => setSelectedTemplate(template.id)}
    >
      <View style={styles.templateThumbnail}>
        {template.thumbnailUrl ? (
          <Image
            source={{ uri: template.thumbnailUrl }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Text style={styles.placeholderIcon}>🎨</Text>
          </View>
        )}
        
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>
      
      <View style={styles.templateInfo}>
        <Text style={styles.templateName} numberOfLines={2}>
          {template.name}
        </Text>
        <Text style={styles.templateDescription} numberOfLines={2}>
          {template.description}
        </Text>
        <View style={styles.templateMeta}>
          <Text style={styles.templateCategory}>
            {getCategoryName(template.category)}
          </Text>
          <Text style={styles.templateDownloads}>
            {template.downloadCount.toLocaleString()} downloads
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose a Template</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading templates...</Text>
          </View>
        ) : (
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.templatesGrid}>
              {templates.map(renderTemplateCard)}
            </View>
          </ScrollView>
        )}

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.selectButton,
              !selectedTemplate && styles.disabledButton,
            ]}
            onPress={handleSelect}
            disabled={!selectedTemplate}
          >
            <Text style={[
              styles.selectButtonText,
              !selectedTemplate && styles.disabledButtonText,
            ]}>
              Use Template
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    maxHeight: '80%',
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 18,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  templatesGrid: {
    paddingVertical: 16,
    gap: 16,
  },
  templateCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  selectedTemplateCard: {
    borderColor: '#3b82f6',
    borderWidth: 2,
  },
  templateThumbnail: {
    position: 'relative',
    height: 120,
  },
  thumbnailImage: {
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
    fontSize: 32,
    color: '#9ca3af',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  templateInfo: {
    padding: 12,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  templateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateCategory: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  templateDownloads: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  selectButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
});
