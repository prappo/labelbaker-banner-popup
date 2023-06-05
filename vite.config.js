export default {
    build: {
      lib: {
        entry: 'src/main.js',
        name: 'labelbaker'
      },
      rollupOptions: {
        output: {
          format: 'umd',
          name: 'labelbaker',
          extend: true
        }
      }
    }
  }
  