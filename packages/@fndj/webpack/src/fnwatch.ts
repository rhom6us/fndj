#!/usr/bin/env node
import { AbortController } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import { watch } from './compile';
import { App, Environment } from './configs/settings';

const [, app] = process.argv.reverse().slice(0, 2) as [Environment, App];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
const controller = new AbortController();
watch(app, controller.signal);
