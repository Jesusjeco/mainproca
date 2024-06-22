import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//Adding TanStack Router library
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

//Adding dotenv
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react()],
  //base: "/mainproca/"
})
