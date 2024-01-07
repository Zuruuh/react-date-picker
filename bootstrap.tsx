import { afterEach } from 'bun:test';
import { cleanup } from '@testing-library/react';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

import day from 'dayjs';
import week from 'dayjs/plugin/weekOfYear';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/fr';

day.extend(week);
day.extend(utc);
day.extend(localeData);
day.locale('fr');

GlobalRegistrator.register();
afterEach(cleanup);
