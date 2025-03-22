'use client';
// Redux for state management
import { Provider } from 'react-redux';
// Types for type safety
import { store } from './store';

// Redux provider
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 