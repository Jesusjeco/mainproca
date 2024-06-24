import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//Adding TanStack Router library
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()],
  publicDir: 'public/',
})