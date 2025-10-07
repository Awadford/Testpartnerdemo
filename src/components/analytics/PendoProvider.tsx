import React from 'react';
import { usePendo } from '@/hooks/usePendo';

export const PendoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePendo();
  return <>{children}</>;
};