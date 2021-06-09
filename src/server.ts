import { config } from 'dotenv';
import * as http from 'http';
import { log } from 'util';

config();

import { app } from './app';

// Set PORT in .env or use 3000 by default
const port: number = process.env.PORT ? +process.env.PORT : 8000;

// Create http server [non ssl]
const server = http.createServer(app);

server.listen(port, '0.0.0.0');
server.on('listening', () => {
  log(`listening on port ${port}`);
});
