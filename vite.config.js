import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fs from 'fs'

const copyTargets = fs.existsSync('server/uploads') 
  ? [{ src: 'server/uploads', dest: 'server' }]
  : []

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: copyTargets
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
