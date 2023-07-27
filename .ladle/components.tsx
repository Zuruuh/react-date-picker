import '@fontsource/poppins';
import type { GlobalProvider } from '@ladle/react';
import React, { StrictMode } from 'react';

export const Provider: GlobalProvider = ({ children }) => (
  <StrictMode>{children}</StrictMode>
);
