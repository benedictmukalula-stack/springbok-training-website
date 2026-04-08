const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

const LOG = path.join(__dirname, 'keepalive.log');
const PID = path.join(__dirname, 'keepalive.pid');
const PORT = 3000;

// Ignore ALL signals so this process never dies
['SIGTERM', 'SIGHUP', 'SIGINT', 'SIGUSR1', 'SIGUSR2'].forEach(sig => {
  process.on(sig, () => {});
});

// Write PID
fs.writeFileSync(PID, process.pid.toString());

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(LOG, line + '\n');
}

function checkAlive() {
  return new Promise(resolve => {
    const sock = net.createConnection({ port: PORT, host: '127.0.0.1' }, () => {
      sock.destroy();
      resolve(true);
    });
    sock.on('error', () => resolve(false));
  });
}

function startServer() {
  log('Launching static-server.js ...');
  const child = spawn('node', ['static-server.js'], {
    cwd: __dirname,
    detached: false,
    stdio: ['ignore', fs.openSync(LOG, 'a'), fs.openSync(LOG, 'a')],
    env: { ...process.env },
  });

  child.on('exit', (code, signal) => {
    log(`static-server exited (code=${code}, sig=${signal}). Restarting in 2s...`);
    setTimeout(startServer, 2000);
  });

  child.on('error', (err) => {
    log(`static-server error: ${err.message}. Restarting in 2s...`);
    setTimeout(startServer, 2000);
  });
}

// Health-check loop: if port 3000 stops responding, kill child so it restarts
setInterval(async () => {
  try {
    const alive = await checkAlive();
    if (!alive) {
      log('Health check FAILED on port 3000');
      // The child auto-restarts on exit, but just in case
    }
  } catch (e) {
    // ignore
  }
}, 30000);

log('=== KEEPALIVE DAEMON STARTED (pid=' + process.pid + ') ===');
startServer();
