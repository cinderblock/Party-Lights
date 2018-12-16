import React, { useState, useEffect } from 'react';

import SocketConnection, { eventHandler } from './SocketConnection.js';

const { width, height, pixels } = require('./PixelMap.js');

function Pixel({ x, y, r, g, b, size }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: y + '%',
        left: x + '%',
        width: size,
        height: size,
        marginTop: -size / 2,
        marginLeft: -size / 2,
        backgroundImage: `radial-gradient(rgb(${r}, ${g}, ${b}),black)`,
        // backgroundColor: `rgb(${r}, ${g}, ${b})`,
        mixBlendMode: 'lighten',
        borderRadius: '50%',
        // filter: 'blur(1px)',
      }}
    />
  );
}

function useSocketEvent(event, action, updateLimit) {
  useEffect(() => {
    let last;
    function actionWrapper(...args) {
      if (updateLimit !== undefined) {
        let now = Date.now();
        if (now - last < updateLimit) return;
        last = now;
      }
      action(...args);
    }
    SocketConnection.on(event, actionWrapper);
    return () => SocketConnection.removeListener(event, actionWrapper);
  }, []);
}

export default function Board(props) {
  const [display, setDisplay] = useState();

  useSocketEvent('frame', ({ pixels }) => setDisplay(pixels), 1000 / 30);

  const ratio = height / width;

  return (
    <div
      style={{
        // border: '10px solid black',
        backgroundColor: 'black',
        // width: '100%',
        // paddingTop: '47.572815533980582524271844660194%',
        // position: 'relative',
      }}
    >
      <div
        style={{
          // backgroundColor: 'grey',
          width: '100%',
          paddingTop: ratio * 100 + '%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {pixels.map(({ x, y, spot }, i) => (
          <Pixel
            key={i}
            x={(x * 100) / width}
            y={(y * 100) / height}
            size={spot.size}
            r={display && display[i].r}
            g={display && display[i].g}
            b={display && display[i].b}
          />
        ))}
      </div>
    </div>
  );
}
