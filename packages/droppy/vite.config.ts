import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: 'inline',
    copyPublicDir: false,
    lib: {
      name: '@meltdownjs/droppy',
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          dir: './dist',
          format: 'cjs',
          entryFileNames: 'index.cjs',
        },
        {
          dir: './dist',
          format: 'es',
          entryFileNames: 'index.js',
        },
      ],
    },
  },
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: './dist',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
})
