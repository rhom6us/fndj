#!/usr/bin/env node

import { watch } from './compile';
import { App, Environment } from './configs/settings';

const [, app] = process.argv.reverse().slice(0, 2) as [Environment, App];
// ...process.argv.slice(process.argv.length - 3, process.argv.length-1)
watch(app);
