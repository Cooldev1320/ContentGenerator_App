import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import type { CanvasElement } from '@/types';

interface PropertyPanelProps {
  selectedElement?: CanvasElement | null;
  onPropertyChange: (property: string, value: any) => void;
}

export default function PropertyPanel({ 
  selectedElement, 
  onPropertyChange 
}: PropertyPanelProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  if (!selectedElement) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Properties</Text>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.expandButton}>
              {isExpanded ? '−' : '+'}
            </Text>
          </TouchableOpacity>
        </View>
        {isExpanded && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⚙️</Text>
            <Text style={styles.emptyTitle}>No Element Selected</Text>
            <Text style={styles.emptySubtitle}>
              Select an element to edit its properties
            </Text>
          </View>
        )}
      </View>
    );
  }

  const handlePropertyChange = (property: string, value: any) => {
    onPropertyChange(property, value);
  };

  const renderColorInput = (label: string, property: string, value: string) => (
    <View style={styles.propertyGroup}>
      <Text style={styles.propertyLabel}>{label}</Text>
      <View style={styles.colorInput}>
        <View style={[styles.colorPreview, { backgroundColor: value }]} />
        <TextInput
          style={styles.colorTextInput}
          value={value}
          onChangeText={(text) => handlePropertyChange(property, text)}
          placeholder="#000000"
        />
      </View>
    </View>
  );

  const renderNumberInput = (label: string, property: string, value: number) => (
    <View style={styles.propertyGroup}>
      <Text style={styles.propertyLabel}>{label}</Text>
      <TextInput
        style={styles.numberInput}
        value={value.toString()}
        onChangeText={(text) => handlePropertyChange(property, parseFloat(text) || 0)}
        keyboardType="numeric"
        placeholder="0"
      />
    </View>
  );

  const renderTextInput = (label: string, property: string, value: string) => (
    <View style={styles.propertyGroup}>
      <Text style={styles.propertyLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={(text) => handlePropertyChange(property, text)}
        placeholder={label}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Properties</Text>
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.expandButton}>
            {isExpanded ? '−' : '+'}
          </Text>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Position</Text>
            <View style={styles.positionRow}>
              {renderNumberInput('X', 'left', selectedElement.left)}
              {renderNumberInput('Y', 'top', selectedElement.top)}
            </View>
          </View>

          {selectedElement.width !== undefined && selectedElement.height !== undefined && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.positionRow}>
                {renderNumberInput('Width', 'width', selectedElement.width)}
                {renderNumberInput('Height', 'height', selectedElement.height)}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            {renderColorInput('Fill Color', 'fill', selectedElement.fill || '#000000')}
            {renderColorInput('Stroke Color', 'stroke', selectedElement.stroke || '#000000')}
            {renderNumberInput('Stroke Width', 'strokeWidth', selectedElement.strokeWidth || 0)}
            {renderNumberInput('Opacity', 'opacity', selectedElement.opacity || 1)}
          </View>

          {selectedElement.type === 'text' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Text</Text>
              <View style={styles.propertyGroup}>
                <Text style={styles.propertyLabel}>Text Content</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={selectedElement.text || ''}
                  onChangeText={(text) => handlePropertyChange('text', text)}
                  placeholder="Enter text"
                  multiline
                  numberOfLines={3}
                />
              </View>
              {renderNumberInput('Font Size', 'fontSize', selectedElement.fontSize || 16)}
              <View style={styles.propertyGroup}>
                <Text style={styles.propertyLabel}>Font Family</Text>
                <View style={styles.fontSelector}>
                  {['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'].map((font) => (
                    <TouchableOpacity
                      key={font}
                      style={[
                        styles.fontOption,
                        selectedElement.fontFamily === font && styles.selectedFontOption,
                      ]}
                      onPress={() => handlePropertyChange('fontFamily', font)}
                    >
                      <Text style={[
                        styles.fontOptionText,
                        selectedElement.fontFamily === font && styles.selectedFontOptionText,
                      ]}>
                        {font}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      )}
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
  expandButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  propertyGroup: {
    marginBottom: 12,
  },
  propertyLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  positionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  colorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  colorTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  fontSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  fontOption: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedFontOption: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  fontOptionText: {
    fontSize: 12,
    color: '#6b7280',
  },
  selectedFontOptionText: {
    color: '#ffffff',
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
