import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.mjs':  'application/javascript',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.webmanifest': 'application/manifest+json',
};

function resolveFile(urlPath) {
  if (urlPath === '/' || urlPath === '') return path.join(__dirname, 'index.html');

  const direct = path.join(__dirname, urlPath);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return direct;

  if (urlPath.endsWith('/')) {
    const idx = path.join(__dirname, urlPath, 'index.html');
    if (fs.existsSync(idx)) return idx;
  }

  if (!path.extname(urlPath)) {
    const asHtml = path.join(__dirname, urlPath + '.html');
    if (fs.existsSync(asHtml)) return asHtml;
    const asDirIdx = path.join(__dirname, urlPath, 'index.html');
    if (fs.existsSync(asDirIdx)) return asDirIdx;
  }

  return null;
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
  const filePath = resolveFile(urlPath);

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
