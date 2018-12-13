'use strict';

// const fs = require('fs');
// const EOL = require('os').EOL;

// const csvFilePath = './pixelMap.csv';

function linearMap(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const dist = (a, b) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

function piecewisePath(points) {
  const lengths = points.slice(1).map((next, i) => dist(points[i], next));
  const length = lengths.reduce((sum, curr) => sum + curr, 0);

  function map(s, len = length) {
    if (s < 0 || s > len) throw Error('Out of range!');

    // Scale to actual length
    s *= length / len;

    let i = 0;
    while (s > lengths[i]) s -= lengths[i++];

    // So the place along the line we need is s units
    // along the path from points[i] to points[i+1]

    const x = linearMap(s, 0, lengths[i], points[i].x, points[i + 1].x);
    const y = linearMap(s, 0, lengths[i], points[i].y, points[i + 1].y);

    // console.log(s, x, y);

    return { x, y };
  }

  return { length, lengths, map };
}

const p = (x, y) => ({ x, y });

const width = 100;
const height = 47.572815533980582524271844660194;
const points = [p(5, 14), p(5, 5), p(95, 5), p(95, 42.6), p(5, 42.6), p(5, 15), p(85, 15), p(85, 32.6), p(7, 32.6)];
const numPixels = 300;

const path = piecewisePath(points);

console.log('Path length:', path.length);

function pixel(i) {
  let { x, y } = path.map(i, numPixels - 1);

  const spot = { size: 200 };

  if (i < 160 || x <= 5) {
    spot.size = 300;
    const c = p(width / 2, height / 2);

    // Shift the coordinate system to the center
    x -= c.x;
    y -= c.y;

    // Scale points towards the edge
    x *= 1.07;
    y *= 1.19;

    // Shift the coordinate system back
    x += c.x;
    y += c.y;
  }

  return { x, y, spot };
}

const pixels = [];
for (let i = 0; i <= numPixels - 1; i++) pixels.push(pixel(i));

module.exports = { width, height, pixels };
