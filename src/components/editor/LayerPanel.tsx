import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { CanvasElement } from '../../types';

interface LayerPanelProps {
  elements: CanvasElement[];
  selectedElement?: CanvasElement | null;
  onElementSelect: (element: CanvasElement | null) => void;
  onElementDelete: (elementId: string) => void;
}

export default function LayerPanel({
  elements,
  selectedElement,
  onElementSelect,
  onElementDelete,
}: LayerPanelProps) {
  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text':
        return 'T';
      case 'rect':
        return '⬜';
      case 'circle':
        return '⭕';
      case 'line':
        return '📏';
      default:
        return '📄';
    }
  };

  const getElementColor = (type: string) => {
    switch (type) {
      case 'text':
        return '#3b82f6';
      case 'rect':
        return '#10b981';
      case 'circle':
        return '#f59e0b';
      case 'line':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const handleElementPress = (element: CanvasElement) => {
    onElementSelect(element);
  };

  const handleDeleteElement = (elementId: string) => {
    onElementDelete(elementId);
  };

  const renderElement = (element: CanvasElement, index: number) => {
    const isSelected = selectedElement?.id === element.id;
    const elementColor = getElementColor(element.type);

    return (
      <TouchableOpacity
        key={element.id}
        style={[
          styles.layerItem,
          isSelected && styles.selectedLayerItem,
        ]}
        onPress={() => handleElementPress(element)}
      >
        <View style={styles.layerContent}>
          <View style={[styles.layerIcon, { backgroundColor: elementColor }]}>
            <Text style={styles.layerIconText}>
              {getElementIcon(element.type)}
            </Text>
          </View>
          
          <View style={styles.layerInfo}>
            <Text style={styles.layerName}>
              {element.type === 'text' ? element.text || 'Text' : `${element.type} ${index + 1}`}
            </Text>
            <Text style={styles.layerType}>
              {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteElement(element.id)}
        >
          <Text style={styles.deleteIcon}>🗑️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Layers</Text>
        <Text style={styles.count}>{elements.length}</Text>
      </View>

      <ScrollView style={styles.content}>
        {elements.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyTitle}>No Layers</Text>
            <Text style={styles.emptySubtitle}>
              Add elements to see them here
            </Text>
          </View>
        ) : (
          <View style={styles.layersList}>
            {elements.map((element, index) => renderElement(element, index))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  count: {
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  layersList: {
    padding: 8,
  },
  layerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
    borderRadius: 8,
    backgroundColor: '#f9fafb',
  },
  selectedLayerItem: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  layerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  layerIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  layerIconText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  layerInfo: {
    flex: 1,
  },
  layerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  layerType: {
    fontSize: 12,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 4,
  },
  deleteIcon: {
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
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
