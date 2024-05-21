import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    sourcemap: 'inline',
    copyPublicDir: false,
    lib: {
      name: '@meltdownjs/cn',
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
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
    dts({
      include: ['src'],
      outDir: './dist',
      copyDtsFiles: true,
      rollupTypes: true,
    }),
  ],
})
