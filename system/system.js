'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;

const io = require('socket.io')(port);
const { v4: uuid } = require('uuid');

// Queue object to store flights
const queue = {};

// Handle socket connections
io.on('connection', socket => {
  console.log('You are connected to the server. Your ID:', socket.id);

  // Handle 'new-flight' event
  socket.on('new-flight', payload => {
    console.log('New Flight:', payload);
    const flightId = generateFlightId();
    const id = uuid();
    queue[id] = payload;
    io.emit('new-flight', payload);
    io.emit('flight', {
      id,
      payload: queue[id]
    });
  });

  // Handle 'took-off' event
  socket.on('took-off', payload => {
    console.log('Flight Took Off:', payload);
    io.emit('took-off', payload);
  });

  // Handle 'Arrived' event
  socket.on('Arrived', payload => {
    console.log('Flight Arrived:', payload);
    io.emit('Arrived', payload);
  });

  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Handle 'get-all' event
  socket.on('get-all', () => {
    Object.keys(queue).forEach(id => {
      socket.emit('flight', {
        id,
        payload: queue[id]
      });
    });
  });

  // Handle 'delete' event
  socket.on('delete', payload => {
    delete queue[payload.id];
    console.log(queue);
  });
});

// Utility function to generate a flight ID
function generateFlightId() {
  return Math.random().toString(36).substr(2, 9);
}

// Start the server and listen on the specified port
console.log(`Socket.io server is running on port ${port}`);
