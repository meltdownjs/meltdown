await Bun.build({
  format: 'esm',
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  sourcemap: 'external',
  minify: true,
})
