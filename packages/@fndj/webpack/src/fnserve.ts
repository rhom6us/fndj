#!/usr/bin/env node
/* eslint-disable no-console */
import { AbortController } from 'abort-controller';
import readline from 'readline';
import { serve } from './compile';
import { App, Environment } from './configs/settings';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const [, app] = process.argv.reverse().slice(0, 2) as [Environment, App];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
const controller = new AbortController();
serve(app, controller.signal).then(url => {
    rl.prompt();
    rl.on('line', async (line) => {
      console.info('stopping server....');
      controller.abort();
      process.exit();
        // await server.stop1();
        // console.info('stopped. starting server...');
        // await server.start();
        // console.info('started!');
        // rl.prompt();
      }).on('close', () => {
        console.log('Have a great day!');
        controller.abort();
        process.exit();
          // server.stop();
      });
})
