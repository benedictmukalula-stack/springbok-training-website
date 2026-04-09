const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'daemon.log');
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(logFile, line);
  process.stdout.write(line);
};

function startServer() {
  log('Starting Next.js dev server...');
  const child = spawn('node', ['node_modules/.bin/next', 'dev', '-p', '3000'], {
    cwd: __dirname,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env }
  });

  child.stdout.on('data', (data) => log(`STDOUT: ${data}`));
  child.stderr.on('data', (data) => log(`STDERR: ${data}`));

  child.on('exit', (code) => {
    log(`Server exited with code ${code}. Restarting in 2s...`);
    setTimeout(startServer, 2000);
  });

  child.on('error', (err) => {
    log(`Server error: ${err.message}. Restarting in 2s...`);
    setTimeout(startServer, 2000);
  });

  child.unref();
}

startServer();
log('Daemon started');
