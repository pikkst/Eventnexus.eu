import 'dotenv/config';
import { spawn } from 'child_process';

let command;
const args = ['dev', ...process.argv.slice(2)];

if (process.platform === 'win32') {
  command = 'cmd.exe';
  args.unshift('/c', 'astro');
} else {
  command = 'astro';
}

const devProcess = spawn(command, args, { stdio: 'inherit', env: process.env });

devProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Astro dev process exited with code ${code}`);
  }
});
