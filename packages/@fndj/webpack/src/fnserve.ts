#!/usr/bin/env node
/* eslint-disable no-console */
import { AbortController } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import readline from 'readline';
import { serve } from './compile';
import { App, Environment } from './configs/settings';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'OHAI> '
});

const [, app] = process.argv.reverse().slice(0, 2) as [Environment, App];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
const controller = new AbortController();
serve(app, controller.signal).then(([url, server]) => {
    rl.prompt();
    rl.on('line', async (line) => {
        console.info('stopping server....');
        await server.stop();
        console.info('stopped. starting server...');
        await server.start();
        console.info('started!');
        rl.prompt();
      }).on('close', () => {
        console.log('Have a great day!');
          server.stop();
      });
})
