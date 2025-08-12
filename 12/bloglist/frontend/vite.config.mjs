import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  const proxyTarget = process.env.VITE_PROXY_TARGET ?? 'http://localhost:3000';

  const config = {
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.js'
    },
    server: {
      allowedHosts: ['bloglist-frontend', 'localhost'],
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true
        }
      }
    }
  };

  return config;
});