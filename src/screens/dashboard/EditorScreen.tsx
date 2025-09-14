import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Canvas, Toolbar, LayerPanel, PropertyPanel } from '../../components/editor';
import { useCanvasStore } from '../../store/canvasStore';
import { StorageService } from '../../services';
import type { Project, CanvasElement } from '../../types';

const { width, height } = Dimensions.get('window');

export default function EditorScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params as { projectId?: string };
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLayers, setShowLayers] = useState(false);
  const [showProperties, setShowProperties] = useState(false);

  const {
    canvasState,
    selectedElement,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    clearSelection,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useCanvasStore();

  useEffect(() => {
    loadProject();
  }, [projectId]);

  const loadProject = async () => {
    try {
      setIsLoading(true);
      if (projectId) {
        const projects = await StorageService.getItem('projects') || [];
        const foundProject = projects.find((p: Project) => p.id === projectId);
        if (foundProject) {
          setProject(foundProject);
          // Load canvas state from project
          if (foundProject.canvasData) {
            // TODO: Load canvas data into store
          }
        }
      }
    } catch (error) {
      console.error('Error loading project:', error);
      Alert.alert('Error', 'Failed to load project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!project) return;

      const updatedProject = {
        ...project,
        canvasData: canvasState,
        updatedAt: new Date().toISOString(),
      };

      const projects = await StorageService.getItem('projects') || [];
      const updatedProjects = projects.map((p: Project) => 
        p.id === project.id ? updatedProject : p
      );
      
      await StorageService.setItem('projects', updatedProjects);
      setProject(updatedProject);
      
      Alert.alert('Success', 'Project saved successfully');
    } catch (error) {
      console.error('Error saving project:', error);
      Alert.alert('Error', 'Failed to save project');
    }
  };

  const handleExport = () => {
    Alert.alert(
      'Export Project',
      'Choose export format',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'PNG', onPress: () => exportProject('png') },
        { text: 'JPG', onPress: () => exportProject('jpg') },
        { text: 'PDF', onPress: () => exportProject('pdf') },
      ]
    );
  };

  const exportProject = async (format: string) => {
    try {
      // TODO: Implement actual export functionality
      Alert.alert('Export', `Exporting as ${format.toUpperCase()}...`);
    } catch (error) {
      console.error('Error exporting project:', error);
      Alert.alert('Error', 'Failed to export project');
    }
  };

  const handleAddText = () => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: 'text',
      left: width / 2 - 50,
      top: height / 2 - 25,
      width: 100,
      height: 50,
      fill: '#000000',
      text: 'New Text',
      fontSize: 16,
      fontFamily: 'Arial',
    };
    addElement(newElement);
  };

  const handleAddShape = (shapeType: 'rect' | 'circle' | 'line') => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: shapeType,
      left: width / 2 - 50,
      top: height / 2 - 50,
      width: 100,
      height: 100,
      fill: '#3b82f6',
      stroke: '#1e40af',
      strokeWidth: 2,
    };
    addElement(newElement);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading editor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{project?.name || 'Untitled Project'}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Toolbar */}
        <Toolbar
          onAddText={handleAddText}
          onAddShape={handleAddShape}
          onUndo={undo}
          onRedo={redo}
          onSave={handleSave}
          onExport={handleExport}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        {/* Canvas Area */}
        <View style={styles.canvasContainer}>
          <Canvas
            elements={canvasState.elements}
            selectedElement={selectedElement}
            onElementSelect={selectElement}
            onElementUpdate={updateElement}
            onElementDelete={deleteElement}
            onCanvasPress={clearSelection}
          />
        </View>

        {/* Side Panels */}
        <View style={styles.sidePanels}>
          <TouchableOpacity
            style={[styles.panelToggle, showLayers && styles.panelToggleActive]}
            onPress={() => setShowLayers(!showLayers)}
          >
            <Text style={styles.panelToggleText}>Layers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.panelToggle, showProperties && styles.panelToggleActive]}
            onPress={() => setShowProperties(!showProperties)}
          >
            <Text style={styles.panelToggleText}>Properties</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Layer Panel */}
      {showLayers && (
        <View style={styles.layerPanel}>
          <LayerPanel
            elements={canvasState.elements}
            selectedElement={selectedElement}
            onElementSelect={selectElement}
            onElementDelete={deleteElement}
          />
        </View>
      )}

      {/* Property Panel */}
      {showProperties && (
        <View style={styles.propertyPanel}>
          <PropertyPanel
            selectedElement={selectedElement}
            onPropertyChange={updateElement}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sidePanels: {
    width: 80,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
    paddingVertical: 8,
  },
  panelToggle: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  panelToggleActive: {
    backgroundColor: '#3b82f6',
  },
  panelToggleText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  layerPanel: {
    position: 'absolute',
    right: 80,
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },
  propertyPanel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#ffffff',
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
  },
});
