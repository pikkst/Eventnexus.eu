import { execSync } from 'node:child_process';
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const envPath = '.env';
const envBak = '.env.bak';

if (fs.existsSync(envPath)) {
  fs.renameSync(envPath, envBak);
}

try {
  execSync('npx astro build', {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: {
      ...process.env,
      PUBLIC_ANALYTICS_ID: 'G-TEST123456',
      PUBLIC_ANALYTICS_ENABLED: 'true',
    },
  });
} finally {
  if (fs.existsSync(envBak)) {
    fs.renameSync(envBak, envPath);
  }
}

const command = process.platform === 'win32' ? 'cmd.exe' : 'npx';
const args = process.platform === 'win32'
  ? ['/c', 'npx', 'serve', 'dist', '-l', '4325']
  : ['npx', 'serve', 'dist', '-l', '4325'];

const serve = spawn(command, args, {
  stdio: 'inherit',
  env: process.env,
});

serve.on('close', (code) => {
  if (code !== 0) {
    console.error(`Serve process exited with code ${code}`);
  }
});
