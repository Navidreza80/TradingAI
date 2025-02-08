'use client'

import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import { usePathname } from 'next/navigation';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
} 