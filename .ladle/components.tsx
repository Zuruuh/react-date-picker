import '@fontsource/poppins';
import type { GlobalProvider } from '@ladle/react';
import React, { StrictMode } from 'react';

import day from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/fr';

day.extend(week);
day.extend(utc);
day.extend(localeData);
day.locale('fr');

export const Provider: GlobalProvider = ({ children }) => (
  <StrictMode>{children}</StrictMode>
);
