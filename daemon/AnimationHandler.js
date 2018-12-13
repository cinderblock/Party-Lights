const { width, height, pixels } = require('../ui/PixelMap.js');

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2, (a.y - b.y) ** 2);
}

function frame(time) {
  const center = pixels[Math.floor(time / 100) % pixels.length];
  return pixels.map((pixel, i) => {
    const { x, y } = pixel;

    let r, g, b;

    const d = 4 * distance(pixel, center);

    r = Math.max(255 - d, 0);

    g = Math.min(255, x);
    b = Math.min(255, y * 5);

    return { r, g, b };
  });
}

module.exports = {
  frame,
  // setEffect,
};
