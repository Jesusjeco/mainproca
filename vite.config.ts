import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//Adding TanStack Router library
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   //console.log('Vite mode:', mode);
//   return {
//     plugins: [
//       TanStackRouterVite(),
//       react()],
//     base: mode === 'production' ? '/mainproca/' : '/',
//   }
// })

export default defineConfig({
  //console.log('Vite mode:', mode);
  plugins: [
    TanStackRouterVite(),
    react()],
})