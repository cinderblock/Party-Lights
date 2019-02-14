// Check if a previous version is running first, and kill them if they still are.
require('./utils/runningProcessChecker.js')('../daemon.pid', 'kill');

// Local dependencies
import debug from './utils/debug';
import clientUI from './ClientUIHandler';
import animation from './AnimationHandler';

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
  const frame = { pixels: animation(Date.now()) };
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
