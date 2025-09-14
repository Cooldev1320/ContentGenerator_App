// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Token DTO
export interface TokenDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

// File Upload Response
export interface FileUploadResponse {
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}

// Export Request/Response
export interface ExportRequest {
  projectId: string;
  format: 'png' | 'jpg' | 'pdf';
  quality?: number;
  includeWatermark?: boolean;
}

export interface ExportResponse {
  downloadUrl: string;
  expiresAt: string;
}
