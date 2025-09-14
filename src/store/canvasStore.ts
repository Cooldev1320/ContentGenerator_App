import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CanvasState, CanvasElement } from '../types';

interface CanvasStore {
  canvasState: CanvasState;
  selectedElement: CanvasElement | null;
  
  // Canvas actions
  setCanvasState: (state: CanvasState) => void;
  clearCanvas: () => void;
  
  // Element actions
  addElement: (element: CanvasElement) => void;
  updateElement: (elementId: string, updates: Partial<CanvasElement>) => void;
  deleteElement: (elementId: string) => void;
  duplicateElement: (elementId: string) => void;
  
  // Selection actions
  selectElement: (element: CanvasElement | null) => void;
  clearSelection: () => void;
  
  // Layer actions
  moveElementToFront: (elementId: string) => void;
  moveElementToBack: (elementId: string) => void;
  moveElementUp: (elementId: string) => void;
  moveElementDown: (elementId: string) => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  
  // Tool actions
  setActiveTool: (tool: string) => void;
  activeTool: string;
}

const initialState: CanvasState = {
  elements: [],
  selectedElementId: undefined,
  history: [],
  historyIndex: -1,
};

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      canvasState: initialState,
      selectedElement: null,
      canUndo: false,
      canRedo: false,
      activeTool: 'select',

      setCanvasState: (state: CanvasState) => {
        set({ canvasState: state });
      },

      clearCanvas: () => {
        set({
          canvasState: initialState,
          selectedElement: null,
        });
      },

      addElement: (element: CanvasElement) => {
        const { canvasState } = get();
        const newElements = [...canvasState.elements, element];
        const newState = {
          ...canvasState,
          elements: newElements,
          selectedElementId: element.id,
        };
        
        // Add to history
        const newHistory = [...canvasState.history.slice(0, canvasState.historyIndex + 1), newState];
        
        set({
          canvasState: newState,
          selectedElement: element,
          canUndo: true,
          canRedo: false,
        });
      },

      updateElement: (elementId: string, updates: Partial<CanvasElement>) => {
        const { canvasState } = get();
        const newElements = canvasState.elements.map(element =>
          element.id === elementId ? { ...element, ...updates } : element
        );
        const newState = {
          ...canvasState,
          elements: newElements,
        };
        
        // Add to history
        const newHistory = [...canvasState.history.slice(0, canvasState.historyIndex + 1), newState];
        
        set({
          canvasState: newState,
          selectedElement: newElements.find(el => el.id === elementId) || null,
        });
      },

      deleteElement: (elementId: string) => {
        const { canvasState } = get();
        const newElements = canvasState.elements.filter(element => element.id !== elementId);
        const newState = {
          ...canvasState,
          elements: newElements,
          selectedElementId: canvasState.selectedElementId === elementId ? undefined : canvasState.selectedElementId,
        };
        
        // Add to history
        const newHistory = [...canvasState.history.slice(0, canvasState.historyIndex + 1), newState];
        
        set({
          canvasState: newState,
          selectedElement: null,
        });
      },

      duplicateElement: (elementId: string) => {
        const { canvasState } = get();
        const element = canvasState.elements.find(el => el.id === elementId);
        if (!element) return;

        const newElement = {
          ...element,
          id: Date.now().toString(),
          left: element.left + 20,
          top: element.top + 20,
        };

        const newElements = [...canvasState.elements, newElement];
        const newState = {
          ...canvasState,
          elements: newElements,
          selectedElementId: newElement.id,
        };
        
        // Add to history
        const newHistory = [...canvasState.history.slice(0, canvasState.historyIndex + 1), newState];
        
        set({
          canvasState: newState,
          selectedElement: newElement,
        });
      },

      selectElement: (element: CanvasElement | null) => {
        set({
          selectedElement: element,
          canvasState: {
            ...get().canvasState,
            selectedElementId: element?.id,
          },
        });
      },

      clearSelection: () => {
        set({
          selectedElement: null,
          canvasState: {
            ...get().canvasState,
            selectedElementId: undefined,
          },
        });
      },

      moveElementToFront: (elementId: string) => {
        const { canvasState } = get();
        const element = canvasState.elements.find(el => el.id === elementId);
        if (!element) return;

        const newElements = [
          ...canvasState.elements.filter(el => el.id !== elementId),
          element,
        ];
        
        set({
          canvasState: {
            ...canvasState,
            elements: newElements,
          },
        });
      },

      moveElementToBack: (elementId: string) => {
        const { canvasState } = get();
        const element = canvasState.elements.find(el => el.id === elementId);
        if (!element) return;

        const newElements = [
          element,
          ...canvasState.elements.filter(el => el.id !== elementId),
        ];
        
        set({
          canvasState: {
            ...canvasState,
            elements: newElements,
          },
        });
      },

      moveElementUp: (elementId: string) => {
        const { canvasState } = get();
        const elementIndex = canvasState.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1 || elementIndex === canvasState.elements.length - 1) return;

        const newElements = [...canvasState.elements];
        [newElements[elementIndex], newElements[elementIndex + 1]] = 
        [newElements[elementIndex + 1], newElements[elementIndex]];
        
        set({
          canvasState: {
            ...canvasState,
            elements: newElements,
          },
        });
      },

      moveElementDown: (elementId: string) => {
        const { canvasState } = get();
        const elementIndex = canvasState.elements.findIndex(el => el.id === elementId);
        if (elementIndex === -1 || elementIndex === 0) return;

        const newElements = [...canvasState.elements];
        [newElements[elementIndex], newElements[elementIndex - 1]] = 
        [newElements[elementIndex - 1], newElements[elementIndex]];
        
        set({
          canvasState: {
            ...canvasState,
            elements: newElements,
          },
        });
      },

      undo: () => {
        const { canvasState } = get();
        if (canvasState.historyIndex > 0) {
          const newIndex = canvasState.historyIndex - 1;
          const newState = canvasState.history[newIndex];
          
          set({
            canvasState: {
              ...newState,
              historyIndex: newIndex,
            },
            selectedElement: newState.elements.find(el => el.id === newState.selectedElementId) || null,
            canUndo: newIndex > 0,
            canRedo: true,
          });
        }
      },

      redo: () => {
        const { canvasState } = get();
        if (canvasState.historyIndex < canvasState.history.length - 1) {
          const newIndex = canvasState.historyIndex + 1;
          const newState = canvasState.history[newIndex];
          
          set({
            canvasState: {
              ...newState,
              historyIndex: newIndex,
            },
            selectedElement: newState.elements.find(el => el.id === newState.selectedElementId) || null,
            canUndo: true,
            canRedo: newIndex < canvasState.history.length - 1,
          });
        }
      },

      setActiveTool: (tool: string) => {
        set({ activeTool: tool });
      },
    }),
    {
      name: 'canvas-storage',
      partialize: (state) => ({
        canvasState: state.canvasState,
        activeTool: state.activeTool,
      }),
    }
  )
);
