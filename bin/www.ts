#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app } from '../app'
import http from 'http';

/** Note to future Perry about some CJS vs ESM imports:
 * 
 * The two lines of code "import { debug } from 'debug';" + "debug('react-backend:server')"
 * Originally was a single line of code:
 * a higher order CommonJS module import "var debug = require('debug')('react-backend:server');".
 * 
 * From reading https://stackoverflow.com/a/59872364 I learned that 
 * first, the left side "require('debug')" gets resolved (as an import).
 * Then the imported module "debug" gets immediately called - something like "debug('react-backend:server')"
 */
import { debug } from 'debug';
debug('react-backend:server')

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

console.log(`Starting Express server. Listening on port: ${port}`)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  if (addr !== null) {
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  } else {
    debug('Listening on ERROR: PORT UNKNOWN')
  }
}
