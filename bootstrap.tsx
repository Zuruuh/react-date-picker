import { afterEach } from 'bun:test';
import { cleanup } from '@testing-library/react';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

GlobalRegistrator.register();
afterEach(cleanup);
