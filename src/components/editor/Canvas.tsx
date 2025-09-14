import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import type { CanvasElement } from '../../types';

const { width, height } = Dimensions.get('window');

interface CanvasProps {
  elements: CanvasElement[];
  selectedElement?: CanvasElement | null;
  onElementSelect: (element: CanvasElement | null) => void;
  onElementUpdate: (elementId: string, updates: Partial<CanvasElement>) => void;
  onElementDelete: (elementId: string) => void;
  onCanvasPress: () => void;
}

export default function Canvas({
  elements,
  selectedElement,
  onElementSelect,
  onElementUpdate,
  onElementDelete,
  onCanvasPress,
}: CanvasProps) {
  const [canvasSize, setCanvasSize] = useState({ width: width - 320, height: height - 200 });

  const handleElementPress = (element: CanvasElement) => {
    onElementSelect(element);
  };

  const handleCanvasPress = () => {
    onCanvasPress();
  };

  const renderElement = (element: CanvasElement) => {
    const isSelected = selectedElement?.id === element.id;
    
    switch (element.type) {
      case 'rect':
        return (
          <TouchableOpacity
            key={element.id}
            style={[
              styles.element,
              {
                left: element.left,
                top: element.top,
                width: element.width,
                height: element.height,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? '#3b82f6' : 'transparent',
              },
            ]}
            onPress={() => handleElementPress(element)}
          >
            <View
              style={[
                styles.rect,
                {
                  backgroundColor: element.fill,
                  borderWidth: element.strokeWidth || 0,
                  borderColor: element.stroke,
                  opacity: element.opacity || 1,
                },
              ]}
            />
          </TouchableOpacity>
        );

      case 'circle':
        return (
          <TouchableOpacity
            key={element.id}
            style={[
              styles.element,
              {
                left: element.left,
                top: element.top,
                width: element.width,
                height: element.height,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? '#3b82f6' : 'transparent',
              },
            ]}
            onPress={() => handleElementPress(element)}
          >
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: element.fill,
                  borderWidth: element.strokeWidth || 0,
                  borderColor: element.stroke,
                  opacity: element.opacity || 1,
                },
              ]}
            />
          </TouchableOpacity>
        );

      case 'text':
        return (
          <TouchableOpacity
            key={element.id}
            style={[
              styles.element,
              {
                left: element.left,
                top: element.top,
                width: element.width,
                height: element.height,
                borderWidth: isSelected ? 2 : 0,
                borderColor: isSelected ? '#3b82f6' : 'transparent',
              },
            ]}
            onPress={() => handleElementPress(element)}
          >
            <View
              style={[
                styles.textContainer,
                {
                  opacity: element.opacity || 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color: element.fill,
                    fontSize: element.fontSize || 16,
                    fontFamily: element.fontFamily || 'Arial',
                  },
                ]}
              >
                {element.text || 'Text'}
              </Text>
            </View>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.canvas}
        onPress={handleCanvasPress}
        activeOpacity={1}
      >
        <View style={styles.canvasContent}>
          {elements.map(renderElement)}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  canvasContent: {
    flex: 1,
    position: 'relative',
  },
  element: {
    position: 'absolute',
    borderRadius: 4,
  },
  rect: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  textContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
