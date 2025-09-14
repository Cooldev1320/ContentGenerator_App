import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    category: string;
    thumbnail: string;
    isPremium?: boolean;
    isPopular?: boolean;
  };
  onPress: () => void;
  onUse: () => void;
}

export default function TemplateCard({ template, onPress, onUse }: TemplateCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>📄</Text>
        </View>
        
        {template.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
        
        {template.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>🔥</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {template.name}
        </Text>
        <Text style={styles.category}>{template.category}</Text>
        
        <TouchableOpacity style={styles.useButton} onPress={onUse}>
          <Text style={styles.useButtonText}>Use Template</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
    color: '#9ca3af',
  },
  premiumBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  premiumText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularText: {
    color: '#ffffff',
    fontSize: 10,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  useButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  useButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});
