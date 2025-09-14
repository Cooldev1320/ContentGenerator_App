import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategoryButton,
            ]}
            onPress={() => onCategorySelect(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategoryButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
});
