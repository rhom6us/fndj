/// <reference types="gapi.client.youtube" />

import { getGapi } from '../gapi';
import { getClient } from './client';

export type Youtube = typeof gapi.client.youtube;
let cache: typeof gapi.client.youtube | undefined;

export async function getYoutube(): Promise<Youtube> {
    if (cache) {
        return cache;
    }
    const gapi = await getGapi();
    const client = await getClient();
    await client.load('youtube', 'v3');
    return cache = gapi.client.youtube;
}
