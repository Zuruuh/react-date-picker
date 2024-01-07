import { resolve } from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// @ts-ignore Bun type definition is buggy for some reason
export default defineConfig((env) => {
  return {
    plugins: [
      react({ jsxRuntime: env.command === 'build' ? 'classic' : 'automatic' }),
      dts({ insertTypesEntry: true, rollupTypes: true }),
    ],
    build: {
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src', 'index.ts'),
        name: '@zuruuh/react-date-picker',
      },
      rollupOptions: {
        external: [...Object.keys(packageJson.peerDependencies)],
        output: {
          globals: {
            react: 'React',
            dayjs: 'day',
          },
        },
      },
      minify: true,
    },
  };
});
