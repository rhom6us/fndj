"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtube = void 0;
const client_1 = require("./client");
await client_1.client.load('youtube', 'v3');
var youtube = client_1.client.youtube;
exports.youtube = youtube;
//# sourceMappingURL=youtube.js.map