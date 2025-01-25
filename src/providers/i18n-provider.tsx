'use client'

// imports
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';

// i18n provider
export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (

    // i18n provider
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
} 