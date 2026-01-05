import path from 'path';
// Fix: Added fileURLToPath from 'url' to facilitate defining __dirname in an ESM environment
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Fix: Manually define __dirname and __filename as they are not available by default in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: '.',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          // Fix: Using the manually defined __dirname for path resolution
          '@': path.resolve(__dirname, '.'),
          // Fix: Using the manually defined __dirname for path resolution
          '/src': path.resolve(__dirname, '.'),
        }
      },
      build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            // Fix: Using the manually defined __dirname for path resolution
            main: path.resolve(__dirname, 'index.html'),
          },
        },
      },
    };
});