const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '.next', 'server', 'app');
const PUBLIC = path.join(__dirname, 'public');
const STATIC = path.join(__dirname, '.next', 'static');
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function sendFile(res, filePath, fallbackPath) {
  fs.readFile(filePath, (err, data) => {
    if (err && fallbackPath) {
      fs.readFile(fallbackPath, (err2, data2) => {
        if (err2) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 Not Found</h1>');
        } else {
          serveContent(res, fallbackPath, data2);
        }
      });
    } else if (err) {
      console.error(`404: ${filePath} (${err.code})`);
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    } else {
      serveContent(res, filePath, data);
    }
  });
}

function serveContent(res, filePath, data) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
  });
  res.end(data);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const urlPath = url.pathname;

  // 1. Static assets: /_next/static/... -> .next/static/...
  if (urlPath.startsWith('/_next/static/')) {
    const filePath = path.join(STATIC, urlPath.replace('/_next/static/', ''));
    sendFile(res, filePath);
    return;
  }

  // 2. Next.js Image Optimization API: /_next/image?url=... -> serve original from public/
  if (urlPath === '/_next/image') {
    const imageUrl = url.searchParams.get('url');
    if (imageUrl) {
      const decoded = decodeURIComponent(imageUrl);
      const filePath = path.join(PUBLIC, decoded);
      sendFile(res, filePath);
    } else {
      res.writeHead(400);
      res.end('Missing url parameter');
    }
    return;
  }

  // 3. Public assets: /images/*, /logo*, /favicon*, etc.
  if (urlPath.startsWith('/images/') || urlPath.startsWith('/logo') || urlPath.includes('favicon') || urlPath.startsWith('/icons/')) {
    const filePath = path.join(PUBLIC, urlPath);
    sendFile(res, filePath);
    return;
  }

  // 4. HTML pages
  let htmlPath;
  if (urlPath === '/') {
    htmlPath = path.join(BASE, 'index.html');
  } else if (urlPath === '/programmes' || urlPath === '/programmes/') {
    htmlPath = path.join(BASE, 'programmes.html');
  } else if (urlPath.startsWith('/programmes/')) {
    const slug = urlPath.replace(/^\/programmes\//, '').replace(/\/$/, '');
    htmlPath = path.join(BASE, 'programmes', slug + '.html');
  } else {
    htmlPath = path.join(BASE, urlPath.replace(/\/$/, '') + '.html');
  }

  sendFile(res, htmlPath);
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on port ${PORT}`);
});
