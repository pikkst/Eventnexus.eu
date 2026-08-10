import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

console.log('serve-disabled: starting');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const distPath = path.resolve('dist-disabled');
console.log('serve-disabled: distPath', distPath);

const server = http.createServer((req, res) => {
  let filePath = path.join(distPath, req.url === '/' ? '/en/index.html' : req.url);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(4327, () => {
  console.log('Server running on 4327');
});

process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  server.close();
  process.exit(0);
});

process.on('uncaughtException', (err) => {
  console.error('serve-disabled: uncaughtException', err);
  process.exit(1);
});
