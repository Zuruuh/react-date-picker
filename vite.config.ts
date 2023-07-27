import { resolve } from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig((env) => ({
  plugins: [
    react({ jsxRuntime: env.command === 'build' ? 'classic' : 'automatic' }),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: '@zuruuh/react-date-picker',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    minify: true,
  },
  test: {
    setupFiles: ['./bootstrap.tsx'],
    environment: 'jsdom',
    silent: false,
  },
}));
