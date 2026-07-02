import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load environment variables (from .env files)
  const env = loadEnv(mode, process.cwd(), '')

  // If VITE_HMR_HOST is defined (e.g. in production/staging environment), use it.
  // Otherwise, fallback to 'true' (Vite will dynamically use the current browser's host/port).
  const hmrConfig = env.VITE_HMR_HOST
    ? {
        host: env.VITE_HMR_HOST,
        protocol: env.VITE_HMR_PROTOCOL || 'wss',
        clientPort: env.VITE_HMR_PORT ? parseInt(env.VITE_HMR_PORT, 10) : 443,
      }
    : true

  return {
    plugins: [react()],
    server: {
      port: 5180,
      strictPort: true,
      host: true,
      allowedHosts: true, // Allow all hosts in development (supports local network access via 192.168.1.187)
      hmr: hmrConfig,
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  }
})
