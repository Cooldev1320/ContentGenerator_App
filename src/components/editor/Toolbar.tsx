import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface ToolbarProps {
  onAddText: () => void;
  onAddShape: (shapeType: 'rect' | 'circle' | 'line') => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onExport: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Toolbar({
  onAddText,
  onAddShape,
  onUndo,
  onRedo,
  onSave,
  onExport,
  canUndo,
  canRedo,
}: ToolbarProps) {
  const tools = [
    {
      id: 'text',
      title: 'Text',
      icon: 'T',
      onPress: onAddText,
      color: '#3b82f6',
    },
    {
      id: 'rect',
      title: 'Rectangle',
      icon: '⬜',
      onPress: () => onAddShape('rect'),
      color: '#10b981',
    },
    {
      id: 'circle',
      title: 'Circle',
      icon: '⭕',
      onPress: () => onAddShape('circle'),
      color: '#f59e0b',
    },
    {
      id: 'line',
      title: 'Line',
      icon: '📏',
      onPress: () => onAddShape('line'),
      color: '#8b5cf6',
    },
  ];

  const actions = [
    {
      id: 'undo',
      title: 'Undo',
      icon: '↶',
      onPress: onUndo,
      disabled: !canUndo,
      color: '#6b7280',
    },
    {
      id: 'redo',
      title: 'Redo',
      icon: '↷',
      onPress: onRedo,
      disabled: !canRedo,
      color: '#6b7280',
    },
    {
      id: 'save',
      title: 'Save',
      icon: '💾',
      onPress: onSave,
      color: '#22c55e',
    },
    {
      id: 'export',
      title: 'Export',
      icon: '📤',
      onPress: onExport,
      color: '#f59e0b',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>
          <View style={styles.toolsRow}>
            {tools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={[styles.toolButton, { backgroundColor: tool.color }]}
                onPress={tool.onPress}
              >
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={styles.toolTitle}>{tool.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.toolsRow}>
            {actions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[
                  styles.toolButton,
                  { backgroundColor: action.color },
                  action.disabled && styles.disabledButton,
                ]}
                onPress={action.onPress}
                disabled={action.disabled}
              >
                <Text style={[
                  styles.toolIcon,
                  action.disabled && styles.disabledIcon,
                ]}>
                  {action.icon}
                </Text>
                <Text style={[
                  styles.toolTitle,
                  action.disabled && styles.disabledText,
                ]}>
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  section: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toolButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toolIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  toolTitle: {
    fontSize: 10,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledIcon: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
});
