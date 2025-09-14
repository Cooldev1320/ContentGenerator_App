import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import TemplatePreview from './TemplatePreview';
import CategoryFilter from './CategoryFilter';
import type { TemplateListDto } from '../../types';

interface TemplateGridProps {
  templates: TemplateListDto[];
  isLoading?: boolean;
  onTemplateSelect: (templateId: string) => void;
  onTemplatePreview?: (templateId: string) => void;
  onRefresh?: () => void;
}

export default function TemplateGrid({
  templates,
  isLoading = false,
  onTemplateSelect,
  onTemplatePreview,
  onRefresh,
}: TemplateGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'social', name: 'Social Media' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'business', name: 'Business' },
    { id: 'branding', name: 'Branding' },
    { id: 'blank', name: 'Blank' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh?.();
    setRefreshing(false);
  };

  const renderTemplate = ({ item }: { item: TemplateListDto }) => (
    <View style={styles.templateItem}>
      <TemplatePreview
        template={item}
        onSelect={onTemplateSelect}
        onPreview={onTemplatePreview}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🎨</Text>
      <Text style={styles.emptyTitle}>No Templates Found</Text>
      <Text style={styles.emptySubtitle}>
        {selectedCategory === 'all' 
          ? 'No templates available at the moment'
          : `No templates found in the ${categories.find(c => c.id === selectedCategory)?.name} category`
        }
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Templates Grid */}
      <FlatList
        data={filteredTemplates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#3b82f6']}
            tintColor="#3b82f6"
          />
        }
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {selectedCategory === 'all' 
                ? 'All Templates' 
                : categories.find(c => c.id === selectedCategory)?.name
              }
            </Text>
            <Text style={styles.headerSubtitle}>
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  gridContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  templateItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
