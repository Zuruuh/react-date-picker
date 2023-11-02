import { afterEach, beforeAll } from 'bun:test';
import { cleanup } from '@testing-library/react';
import { GlobalRegistrator } from '@happy-dom/global-registrator';

beforeAll(GlobalRegistrator.register);
afterEach(cleanup);
