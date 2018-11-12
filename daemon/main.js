// Check if a previous version is running first, and kill them if they still are.
require('./utils/runningProcessChecker.js')('../daemon.pid', 'kill');

const WebSocket = require('ws');

// Local dependencies
const debug = require('./utils/debug.js');
const clientUI = require('./ClientUIHandler.js');

// config
const socketURL = 'ws://esp-lights/ws';

const socket = new WebSocket(socketURL);

socket.addEventListener('open', console.log.bind(0, 'Open:'));
socket.addEventListener('error', console.log.bind(0, 'Error:'));
socket.addEventListener('message', console.log.bind(0, 'Message:'));

const Store = {};

// socket.on('startuptime', u => (Store.startuptime = u));

// Events from the UI and how to handle them
const remoteControlServer = clientUI({
  // This event happens when mobile devices report their orientation data to the
  // server.
  // This could be very useful as a remote.
  // Careful, this event happens at ~60Hz.
  deviceorientation: orientation => {
    // debug.log(orientation);
  },

  Shutdown,

  // More event handlers
});

debug.green('Hello, world.');

function Shutdown() {
  // Shutdown remote control server
  remoteControlServer.close();

  // Just kill the process in a short time since we're not great at stopping all
  // running events
  setTimeout(() => {
    process.exit(0);
  }, 100);
}
