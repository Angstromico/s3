import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import path from 'path'
const __dirname = path.resolve()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2021',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      c: path.resolve(__dirname, './src/components/'),
      a: path.resolve(__dirname, './src/assets/'),
    },
  },
})
