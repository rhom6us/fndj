#!/usr/bin/env node

import { compile } from './compile';
import { App, Environment } from './configs/settings';

const [, app] = process.argv.reverse().slice(0, 2) as [Environment, App];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
compile(app);
//fndosomething('fnbuild', app, process.env.NODE_ENV || 'development');
