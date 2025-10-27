// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..']
      }
    }
  },

  output: 'static',
  integrations: [react()],
});