import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: 'app/public',
  resolve: {
    alias: {
      '@newhorizons/core': '/lib',
    },
  },
  plugins: [
    dts({
      include: ['lib/**/*'],
      exclude: ['lib/**/*.{test,spec}.*'],
      tsconfigPath: './tsconfig.build.json',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib'),
      name: '@newhorizons/core',
      formats: ['es'],
      fileName: `index`,
    },
  },
});
