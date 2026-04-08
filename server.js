#!/usr/bin/env node
/**
 * Springbok Training Academy — Permanent Static Server
 * Self-contained: keepalive + static server in one process.
 * Auto-restarts itself via crontab as final safety net.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

const BASE = path.join(__dirname, '.next', 'server', 'app');
const PUBLIC = path.join(__dirname, 'public');
const STATIC = path.join(__dirname, '.next', 'static');
const PORT = 3000;
const LOG_FILE = path.join(__dirname, 'server.log');
const PID_FILE = path.join(__dirname, 'server.pid');

// ── Ignore all termination signals ──
['SIGTERM', 'SIGHUP', 'SIGINT', 'SIGUSR1', 'SIGUSR2'].forEach(sig => {
  process.on(sig, () => {
    log(`Received ${sig}, ignoring.`);
  });
});

process.on('uncaughtException', (err) => {
  log(`UNCAUGHT EXCEPTION: ${err.message}. Will NOT exit.`);
});

// ── Logging ──
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  try {
    fs.appendFileSync(LOG_FILE, line + '\n');
  } catch (e) {
    // silently ignore write errors
  }
}

// ── PID management ──
fs.writeFileSync(PID_FILE, process.pid.toString());
log(`PID: ${process.pid}`);

// ── MIME types ──
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
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

// ── File serving ──
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
      log(`404: ${filePath} (${err.code})`);
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

// ── Create HTTP server ──
function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const urlPath = url.pathname;

      // 1. Static assets: /_next/static/... → .next/static/...
      if (urlPath.startsWith('/_next/static/')) {
        const filePath = path.join(STATIC, urlPath.replace('/_next/static/', ''));
        sendFile(res, filePath);
        return;
      }

      // 2. Next.js Image Optimization API: /_next/image?url=... → serve from public/
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

      // 3. Public assets: /images/*, /logo*, /favicon*, /icons/*, *.svg, *.png, *.jpg, *.webp, *.pdf
      const publicPatterns = ['/images/', '/logo', '/icons/'];
      const isPublic = publicPatterns.some(p => urlPath.startsWith(p)) ||
                        urlPath.includes('favicon') ||
                        /\.(svg|png|jpg|jpeg|webp|gif|ico|pdf|woff|woff2|mp4)$/i.test(urlPath);
      if (isPublic) {
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
    } catch (err) {
      log(`Request error: ${err.message}`);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      log(`Port ${PORT} already in use. Killing existing process...`);
      // Try to kill whatever is on port 3000
      try {
        const result = spawn('fuser', ['-k', `${PORT}/tcp`], { detached: false });
        result.on('close', () => {
          log('Retrying in 2s...');
          setTimeout(() => {
            server.listen(PORT, '0.0.0.0');
          }, 2000);
        });
      } catch (e) {
        log(`fuser failed: ${e.message}`);
      }
    } else {
      log(`Server error: ${err.message}`);
    }
  });

  return server;
}

// ── Start server ──
const server = createServer();

function startListening() {
  server.listen(PORT, '0.0.0.0', () => {
    log(`✅ Server running on port ${PORT}`);
  });

  server.on('listening', () => {
    log('Server is listening');
  });
}

startListening();

// ── Health check — if server somehow dies, recreate ──
server.on('close', () => {
  log('Server closed unexpectedly. Recreating...');
  const newServer = createServer();
  newServer.listen(PORT, '0.0.0.0');
});

// ── Self-heal: every 30s check if port is responding ──
setInterval(() => {
  const sock = net.createConnection({ port: PORT, host: '127.0.0.1' }, () => {
    sock.destroy();
  });
  sock.on('error', () => {
    log('Health check FAILED — port not responding. Restarting...');
    try {
      server.close();
    } catch (e) {}
    startListening();
  });
}, 30000);

log('=== SPRINGBOK STATIC SERVER STARTED ===');
