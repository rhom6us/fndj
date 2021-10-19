

import { client } from './client';

await client.load('youtube', 'v3');
export const youtube = client.youtube;

export { client };
