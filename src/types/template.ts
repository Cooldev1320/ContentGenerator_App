// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  templateData: any;
  isPremium: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateListDto {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  isPremium: boolean;
  downloadCount: number;
}

export interface TemplateDto extends Template {
  downloadCount: number;
}
