import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../../navigation/TabNavigator';
import Header from '../../components/layout/Header';

type TemplatesScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Templates'>;

interface Props {
  navigation: TemplatesScreenNavigationProp;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export function TemplatesScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Stories'];

  const templates = [
    {
      id: '1',
      title: 'Modern Business',
      category: 'Instagram',
      isPremium: false,
      thumbnail: '🎨',
    },
    {
      id: '2',
      title: 'Creative Agency',
      category: 'Facebook',
      isPremium: true,
      thumbnail: '✨',
    },
    {
      id: '3',
      title: 'Minimalist Post',
      category: 'Instagram',
      isPremium: false,
      thumbnail: '🎯',
    },
    {
      id: '4',
      title: 'Product Launch',
      category: 'Twitter',
      isPremium: true,
      thumbnail: '🚀',
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search templates..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Templates Grid */}
        <ScrollView style={styles.templatesContainer}>
          <View style={styles.templatesGrid}>
            {filteredTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateCard, { width: cardWidth }]}
                onPress={() => {
                  console.log('Selected template:', template.title);
                }}
              >
                <View style={styles.templateThumbnail}>
                  <Text style={styles.templateThumbnailText}>{template.thumbnail}</Text>
                  {template.isPremium && (
                    <View style={styles.premiumBadge}>
                      <Text style={styles.premiumText}>PRO</Text>
                    </View>
                  )}
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateTitle}>{template.title}</Text>
                  <Text style={styles.templateCategory}>{template.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {filteredTemplates.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🔍</Text>
              <Text style={styles.emptyStateTitle}>No templates found</Text>
              <Text style={styles.emptyStateDescription}>
                Try adjusting your search or category filter
              </Text>
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
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  categoryTextActive: {
    color: '#ffffff',
  },
  templatesContainer: {
    flex: 1,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  templateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  templateThumbnail: {
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  templateThumbnailText: {
    fontSize: 32,
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f59e0b',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  templateInfo: {
    padding: 12,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  templateCategory: {
    fontSize: 12,
    color: '#6b7280',
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
  },
});