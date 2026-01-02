import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  base: '/27-asc-agfi/',
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
