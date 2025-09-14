// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  templateId?: string;
  canvasData: CanvasState;
  thumbnailUrl?: string;
  width: number;
  height: number;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ProjectListDto {
  id: string;
  name: string;
  description?: string;
  templateId?: string;
  thumbnailUrl?: string;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  templateId?: string;
  canvasData?: CanvasState;
  width?: number;
  height?: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  canvasData?: CanvasState;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  status?: 'Draft' | 'Published' | 'Archived';
}

// Canvas State
export interface CanvasState {
  elements: CanvasElement[];
  selectedElementId?: string;
  history: CanvasState[];
  historyIndex: number;
}

export interface CanvasElement {
  id: string;
  type: 'text' | 'rect' | 'circle' | 'line' | 'image';
  left: number;
  top: number;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  // Text specific properties
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right';
  // Image specific properties
  src?: string;
  // Line specific properties
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}
