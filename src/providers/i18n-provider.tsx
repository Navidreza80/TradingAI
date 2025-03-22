'use client'
// i18n for translation
import i18n from '@/i18n/config';
import { I18nextProvider } from 'react-i18next';
// Redux for state management
import { store } from '@/hooks/redux/store';
import { Provider } from 'react-redux';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </Provider>
  );
} 