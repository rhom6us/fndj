import { expose } from 'comlink';
import { services } from '@fndj/core';
export type WorkerType = typeof services.superpowered.analyze;
expose(services.superpowered.analyze);
