import { Metadata } from 'next';

export interface RobotsInfo {
  index?: boolean;
  follow?: boolean;
  'max-video-preview'?: number;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
}

export interface I18nMetadataItem {
  title: string;
  description: string;
}

export interface I18nMetadata {
  [key: string]: I18nMetadataItem;
} 