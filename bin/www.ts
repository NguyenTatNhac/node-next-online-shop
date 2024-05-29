#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../src/app';
import http from 'http';
import sequelize from '../src/sequelize';
import Logger from '../src/utils/Logger';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
(async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Connection to database has been established successfully.');
  } catch (error) {
    Logger.error('Unable to connect to the database', error);
    return;
  }

  try {
    // Todo: change the sync strategy before deploying to production
    await sequelize.sync({ alter: true });
    Logger.info('The database has been synchronized successfully.');
  } catch (error) {
    Logger.error('Unable to sync the database', error);
    return;
  }

  try {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
  } catch (error) {
    Logger.error('Unable to start the server', error);
  }
})();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10);

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

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      Logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      Logger.error(bind + ' is already in use');
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
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  Logger.info('Listening on ' + bind);
}
