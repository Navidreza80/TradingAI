// imports
import { Metadata } from 'next';

// social metadata
export interface SocialMetadata {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site: string;
  creator: string;
}

// metadata image
export interface MetadataImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

// open graph metadata
export interface OpenGraphMetadata {
  type: 'website' | 'article' | 'profile';
  locale: string;
  alternateLocale: string[];
  url: string;
  siteName: string;
  images: MetadataImage[];
}

// google bot metadata
export interface GoogleBotMetadata {
  index: boolean;
  follow: boolean;
  'max-video-preview': number;
  'max-image-preview': 'none' | 'standard' | 'large';
  'max-snippet': number;
}

// robots metadata
export interface RobotsMetadata {
  index: boolean;
  follow: boolean;
  googleBot: GoogleBotMetadata;
}

// theme color metadata
export interface ThemeColorMetadata {
  media: string;
  color: string;
}

// site config
export interface SiteConfig extends Metadata {
  title: string;
  description: string;
  keywords: string;
  authors: Array<{ name: string }>;
  creator: string;
  themeColor: ThemeColorMetadata[];
  openGraph: OpenGraphMetadata;
  twitter: SocialMetadata;
  robots: RobotsMetadata;
}

// localized metadata
export interface LocalizedMetadata {
  title: string;
  description: string;
}

// i18n metadata
export interface I18nMetadata {
  [key: string]: LocalizedMetadata;
} 