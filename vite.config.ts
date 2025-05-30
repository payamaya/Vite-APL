import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api/': {
        // target: env.VITE_API_TARGET_URL,
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // Only for development
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
