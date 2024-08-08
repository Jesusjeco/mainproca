import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
//Adding TanStack Router library
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
	plugins: [
		TanStackRouterVite(),
		react(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "Mainproca",
				short_name: "Mainproca",
				description: "Sistema para Mainproca",
				theme_color: "#056db5",
				icons: [
					{
						src: "logoMainprocaSmall.png", // Path to your icon
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "logoMainprocaSmall.png", // Path to your icon
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	publicDir: "public/",
});
