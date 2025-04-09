import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:7293', // Must match your backend URL
        changeOrigin: true,
        secure: false, // Only for development
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
