'use client';
// Redux for state management
import { Provider } from 'react-redux';
import { store } from './store';

// Redux provider
export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 