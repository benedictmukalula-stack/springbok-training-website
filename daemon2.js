const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Prevent this process from being killed
process.on('SIGTERM', () => {});
process.on('SIGHUP', () => {});
process.on('SIGINT', () => {});

const logFile = '/home/z/my-project/daemon2.log';
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(logFile, line);
};

function startServer() {
  log('Starting server...');
  const child = spawn('node', ['node_modules/.bin/next', 'start', '-p', '3000'], {
    cwd: '/home/z/my-project',
    detached: true,
    stdio: ['ignore', fs.openSync(logFile, 'a'), fs.openSync(logFile, 'a')],
    env: { ...process.env, NODE_ENV: 'production' }
  });
  child.unref();

  child.on('exit', (code) => {
    log(`Server exited code ${code}. Restart in 3s...`);
    setTimeout(startServer, 3000);
  });
}

log('=== DAEMON STARTED ===');
startServer();
