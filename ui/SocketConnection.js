// config
const socketURL = 'ws://esp-lights/ws';

const socket = new WebSocket(socketURL);

socket.addEventListener('open', console.log.bind(0, 'Open:'));
socket.addEventListener('error', console.log.bind(0, 'Error:'));
socket.addEventListener('message', console.log.bind(0, 'Message:'));

const Store = {};

// socket.on('startuptime', u => (Store.startuptime = u));

window.addEventListener(
  'deviceorientation',
  ({ alpha, beta, gamma }) =>
    alpha !== null && socket.send('event' /*, { name: 'deviceorientation', value: { alpha, beta, gamma } } */)
);

const eventHandlers = {};

function eventHandler(name, log = true) {
  return (
    eventHandlers[name] ||
    (eventHandlers[name] = value => {
      if (typeof value != 'number' && typeof value != 'string' && value) {
        value = value.target.value;
      }

      socket.send('event', {
        name,
        value,
      });

      if (log) console.log('Event:', name, '->', value === undefined ? 'value undefined' : value);
    })
  );
}

export { socket as default, eventHandler, Store };
