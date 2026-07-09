import 'dotenv/config';
import { spawn } from 'child_process';

let command;
let args = ['dev'];

if (process.platform === 'win32') {
  command = 'cmd.exe';
  args = ['/c', 'astro', ...args];
} else {
  command = 'astro';
}

const devProcess = spawn(command, args, { stdio: 'inherit' });

devProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Astro dev process exited with code ${code}`);
  }
});
