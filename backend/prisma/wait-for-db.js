const net = require('net');
const { URL } = require('url');

const dbUrlStr = process.env.DATABASE_URL;
if (!dbUrlStr) {
  console.log('DATABASE_URL is not set. Skipping wait.');
  process.exit(0);
}

let host = 'db';
let port = 5432;

try {
  const parsed = new URL(dbUrlStr);
  host = parsed.hostname || 'db';
  port = parsed.port ? parseInt(parsed.port, 10) : 5432;
} catch (e) {
  // fallback parse
  const match = dbUrlStr.match(/@([^:/]+)(?::(\d+))?/);
  if (match) {
    host = match[1];
    if (match[2]) {
      port = parseInt(match[2], 10);
    }
  }
}

console.log(`Waiting for database at ${host}:${port}...`);

const checkConnection = () => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    
    socket.setTimeout(2000);
    
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    
    socket.connect(port, host);
  });
};

const maxTries = 30;
let tries = 0;

const loop = async () => {
  while (tries < maxTries) {
    tries++;
    const connected = await checkConnection();
    if (connected) {
      console.log('Database is ready!');
      process.exit(0);
    }
    console.log(`Database not ready yet (attempt ${tries}/${maxTries}). Retrying in 2 seconds...`);
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.error('Database connection timed out. Exiting.');
  process.exit(1);
};

loop();
