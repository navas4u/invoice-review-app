import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api/,
            '/macros/s/AKfycbyqtOuGy9_4J2pbyP9fRTJZrhGbtXZMiMYA6uZCzShf4bCJj7HYGGin5ZvfexRVmzX6pg/exec'
          )
      }
    }
  }
})
