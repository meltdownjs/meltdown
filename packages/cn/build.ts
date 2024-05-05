await Bun.build({
    entrypoints: ['./index.ts'],
    outdir: './dist',
    sourcemap: "external",
    minify: true,
  });