import { createReadStream, existsSync, statSync, cpSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootAssetsDir = path.resolve(__dirname, '../assets');

function serveRootAssets() {
  return {
    name: 'serve-root-assets',
    configureServer(server) {
      server.middlewares.use('/assets', (req, res, next) => {
        const urlPath = decodeURIComponent((req.url || '').split('?')[0]);
        const filePath = path.resolve(rootAssetsDir, `.${urlPath}`);

        if (!filePath.startsWith(rootAssetsDir) || !existsSync(filePath)) {
          next();
          return;
        }

        const stat = statSync(filePath);
        if (!stat.isFile()) {
          next();
          return;
        }

        createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      // Copy assets to dist after build if they exist
      if (existsSync(rootAssetsDir)) {
        const distDir = path.resolve(__dirname, 'dist');
        const distAssetsDir = path.resolve(distDir, 'assets');

        console.log(`Copying assets from ${rootAssetsDir} to ${distAssetsDir}`);

        try {
          mkdirSync(distAssetsDir, { recursive: true });
          cpSync(rootAssetsDir, distAssetsDir, { recursive: true });
          console.log('Assets copied successfully');
        } catch (error) {
          console.error('Error copying assets:', error);
        }
      } else {
        console.warn(`Warning: Assets directory not found at ${rootAssetsDir}`);
        console.warn('Please download assets from https://huggingface.co/Supertone/supertonic-3');
      }
    }
  };
}

export default defineConfig({
  plugins: [serveRootAssets()],
  publicDir: 'public',
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext'
  },
  optimizeDeps: {
    exclude: ['onnxruntime-web']
  }
});
