'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

// Handle socket connections
io.on('connection', socket => {
  console.log('You are connected to the server. Your ID:', socket.id);

  // Handle 'new-flight' event
  socket.on('new-flight', payload => {
    console.log('New Flight:', payload);
    io.emit('new-flight', payload);
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
});

// Start the server and listen on the specified port
console.log(`Socket.io server is running on port ${port}`);
