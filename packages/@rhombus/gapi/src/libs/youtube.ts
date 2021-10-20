

import { client } from './client';

await client.load('youtube', 'v3');

import youtube = client.youtube;

export { youtube };
