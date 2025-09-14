// Fabric.js Types for React Native
export interface FabricCanvas {
  width: number;
  height: number;
  backgroundColor?: string;
  selection: boolean;
  preserveObjectStacking: boolean;
}

export interface FabricObject {
  id: string;
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  opacity: number;
  visible: boolean;
  selectable: boolean;
  evented: boolean;
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDashArray: number[];
  strokeLineCap: 'butt' | 'round' | 'square';
  strokeLineJoin: 'miter' | 'round' | 'bevel';
  shadow: FabricShadow;
  clipPath?: FabricObject;
  transformMatrix?: number[];
}

export interface FabricTextbox extends FabricObject {
  type: 'textbox';
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textDecoration: 'none' | 'underline' | 'line-through';
  lineHeight: number;
  charSpacing: number;
  textBackgroundColor?: string;
  path?: string;
  pathStartOffset?: number;
  pathSide?: 'left' | 'right';
  pathAlign?: 'baseline' | 'center' | 'ascender' | 'descender';
}

export interface FabricImage extends FabricObject {
  type: 'image';
  src: string;
  crossOrigin?: string;
  filters: FabricFilter[];
  resizeFilter?: FabricFilter;
  cropX?: number;
  cropY?: number;
}

export interface FabricRect extends FabricObject {
  type: 'rect';
  rx?: number;
  ry?: number;
}

export interface FabricCircle extends FabricObject {
  type: 'circle';
  radius: number;
}

export interface FabricLine extends FabricObject {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface FabricShadow {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
  affectStroke: boolean;
  nonScaling: boolean;
}

export interface FabricFilter {
  type: string;
  [key: string]: any;
}

// Fabric.js Events
export interface FabricEvent {
  target?: FabricObject;
  e: Event;
  pointer?: { x: number; y: number };
  transform?: {
    target: FabricObject;
    action: string;
    corner: string;
    originX: string;
    originY: string;
    scaleX: number;
    scaleY: number;
    skewX: number;
    skewY: number;
    angle: number;
    left: number;
    top: number;
  };
}

// Fabric.js Canvas Events
export interface FabricCanvasEvents {
  'object:added': (e: FabricEvent) => void;
  'object:removed': (e: FabricEvent) => void;
  'object:modified': (e: FabricEvent) => void;
  'object:moving': (e: FabricEvent) => void;
  'object:scaling': (e: FabricEvent) => void;
  'object:rotating': (e: FabricEvent) => void;
  'object:skewing': (e: FabricEvent) => void;
  'selection:created': (e: FabricEvent) => void;
  'selection:updated': (e: FabricEvent) => void;
  'selection:cleared': (e: FabricEvent) => void;
  'path:created': (e: FabricEvent) => void;
  'mouse:down': (e: FabricEvent) => void;
  'mouse:move': (e: FabricEvent) => void;
  'mouse:up': (e: FabricEvent) => void;
  'mouse:over': (e: FabricEvent) => void;
  'mouse:out': (e: FabricEvent) => void;
}
