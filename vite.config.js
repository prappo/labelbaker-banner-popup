import { defineConfig } from 'vite'
import commonjs from '@rollup/plugin-commonjs'
export default defineConfig({
  plugins: [commonjs()],
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'labelbaker',
      fileName: (format) => `labelbaker.js`
    },
    rollupOptions: {
      output: {
        format: 'umd',
        name: 'labelbaker',
        extend: true
      }
    }
  }
})
