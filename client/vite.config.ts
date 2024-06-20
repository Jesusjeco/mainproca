import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//Adding TanStack Router library
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

//Adding dotenv
import dotenv from 'dotenv';
dotenv.config();

// vitest automatically sets NODE_ENV to 'test' when running tests
const isTest = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !isTest && TanStackRouterVite(),
    react()],
  define: {
    'process.env': process.env
  }
})
