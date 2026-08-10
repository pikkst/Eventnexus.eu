import { execSync } from 'node:child_process';
import { spawn } from 'node:child_process';

execSync('npx astro build --outDir dist-disabled', {
  cwd: process.cwd(),
  stdio: 'inherit',
  env: {
    ...process.env,
    PUBLIC_ANALYTICS_ENABLED: 'false',
  },
});

const command = process.platform === 'win32' ? 'cmd.exe' : 'npx';
const args = process.platform === 'win32'
  ? ['/c', 'npx', 'serve', 'dist-disabled', '-l', '4326']
  : ['serve', 'dist-disabled', '-l', '4326'];

const serve = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
});

serve.on('close', (code) => {
  if (code !== 0) {
    console.error(`Serve process exited with code ${code}`);
  }
});
