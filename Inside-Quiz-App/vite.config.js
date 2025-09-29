import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/QuizInsideBuild/",
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemap for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    proxy: {
      '/ws': {
        target: 'wss://game1-wss-mcp.gamota.net:8843',
        ws: true,
        changeOrigin: true
      },
      '/api': {
        target: 'https://game1-wss-mcp.gamota.net:8843',
        changeOrigin: true,
        secure: true
      }
    }
  },
  preview: {
    port: 3000,
    host: true
  }
})
