// Check if a previous version is running first, and kill them if they still are.
require('./utils/runningProcessChecker.js')('../daemon.pid', 'kill');

// Local dependencies
import debug from './utils/debug';
import clientUI from './ClientUIHandler';
import animation from './AnimationHandler';
import { pixels } from '../PixelMap';

import WS2812 from 'rpi-ws281x-native';

const remoteControlServer = clientUI({});

debug.green('Hello, world.');

const numLeds = pixels.length;

WS2812.init(numLeds);
WS2812.setBrightness(255);

const buff = new Uint32Array(numLeds);

setInterval(() => {
  const frame = { pixels: animation(Date.now()) };

  buff.set(frame.pixels.map(({ r, g, b }) => (r << 16) | (g << 8) | b));

  WS2812.render(buff);
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
