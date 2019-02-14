import { width, height, pixels } from '../PixelMap';

export type Point = {
  x: number;
  y: number;
};

function distance(a: Point, b: Point) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export default function frame(time: number) {
  const center = pixels[Math.floor(time / 100) % pixels.length];
  return pixels.map((pixel, i) => {
    const { x, y } = pixel;

    let r: number, g: number, b: number;

    const d = 4 * distance(pixel, center);

    r = Math.max(255 - d, 0);

    g = Math.min(255, x);
    b = Math.min(255, y * 5);

    return { r, g, b };
  });
}
