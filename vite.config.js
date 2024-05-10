import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/manager': {
        target: 'http://192.168.73.129:5000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/manager/, ''),
      },
    },
  },
});