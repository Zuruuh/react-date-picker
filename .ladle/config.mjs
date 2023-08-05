import { resolve } from 'path';

export default {
  viteConfig: resolve(process.cwd(), '.ladle', 'vite.config.ts'),
  outDir: 'preview',
  defaultStory: 'basic--simple'
};
