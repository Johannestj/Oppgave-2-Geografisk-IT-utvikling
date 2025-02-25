import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  server: {
    open: true,
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
    },
  },
  define: {
    global: {},
    'process.env': {},
  },
  build: {
    rollupOptions: {
      plugins: [],
    },
  },
});
