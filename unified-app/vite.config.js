import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				manualChunks: {
					'react-vendor': ['react', 'react-dom'],
					'router': ['react-router-dom'],
					'ui': ['@radix-ui/react-label', '@radix-ui/react-slot', '@radix-ui/react-tabs', '@radix-ui/react-toast'],
					'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
					'animation': ['framer-motion'],
					'pdf': ['jspdf'],
					'icons': ['lucide-react']
				}
			}
		}
	},
	server: {
		port: 3000,
		open: true
	}
});
