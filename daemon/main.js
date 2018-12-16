// Check if a previous version is running first, and kill them if they still are.
require('./utils/runningProcessChecker.js')('../daemon.pid', 'kill');

const WebSocket = require('ws');

// Local dependencies
const debug = require('./utils/debug.js');
const clientUI = require('./ClientUIHandler.js');
const animation = require('./AnimationHandler.js');

// config
const socketURL = 'ws://blink182/ws';

const socket = new WebSocket(socketURL);
// socket.binaryType = 'arraybuffer';

socket.addEventListener('open', () => {
  // open = true;
});
socket.addEventListener('error', err => console.log('Socket Error'));
socket.addEventListener('message', msg => {
  if (msg.type == 'message') {
    if (typeof msg.data == 'string') console.log('Socket String:', msg.data);
    else console.log('Socket Data:', String.fromCharCode.apply(null, new Uint8Array(msg.data)));
  } else console.log('Socket Message Type:', msg.type);
});

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

const buff = new Uint8Array(300 * 3);

setInterval(() => {
  const frame = { pixels: animation.frame(Date.now()) };

  if (socket.readyState === socket.OPEN) {
    let i = 0;
    frame.pixels.forEach(({ r, g, b }) => {
      buff[i++] = r;
      buff[i++] = g;
      buff[i++] = b;
    });
    socket.send(buff.buffer, { binary: true });
  }

  remoteControlServer.volatile.emit('frame', frame);
}, 1000 / 40);

function Shutdown() {
  // Shutdown remote control server
  remoteControlServer.close();

  // Just kill the process in a short time since we're not great at stopping all
  // running events
  setTimeout(() => {
    process.exit(0);
  }, 100);
}
