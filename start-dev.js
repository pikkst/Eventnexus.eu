import dotenv from 'dotenv';
import fs from 'node:fs';

if (fs.existsSync('.env.test')) {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

import { spawn } from 'child_process';

let command;
const args = ['dev', ...process.argv.slice(2)];

if (process.platform === 'win32') {
  command = 'cmd.exe';
  args.unshift('/c', 'npx', 'astro');
} else {
  command = 'npx';
  args.unshift('astro');
}

const devProcess = spawn(command, args, { stdio: 'inherit', env: process.env });

devProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Astro dev process exited with code ${code}`);
  }
});
