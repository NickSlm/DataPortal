import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        allowedHosts: ['persevere-dynasty-eternal.ngrok-free.dev']
    },
    proxy: {
  '/data': { target: 'http://localhost:5173', changeOrigin: true },
  '/pvp': { target: 'http://localhost:5173', changeOrigin: true },
    },
    plugins: [react()],
})
