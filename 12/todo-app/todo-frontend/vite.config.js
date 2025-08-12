import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: 'true'
  },
  server: {
    allowedHosts: ['todo-frontend']
    /* hmr: {
      protocol: 'ws',
      host: 'app',
      port: 5173
    } */ // for allowing wget requests from busybox
  }
})
