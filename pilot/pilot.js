'use strict';

require('dotenv').config();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const serverUrl = `http://${host}:${port}`;

const io = require('socket.io-client');

// Connect to the socket.io server
const socket = io.connect(serverUrl);

// Handle 'connect' event
socket.on('connect', () => {
  console.log('Pilot: Connected to the socket.io server');
});

// Handle 'new-flight' event from the 'airline' namespace
socket.on('airline:new-flight', (newFlight) => {
  console.log('Pilot: New flight scheduled - Flight ID:', newFlight.details.flightID);
  flightHandler(newFlight);
});

// Handle 'Arrived' event
socket.on('Arrived', (newFlight) => {
  console.log('Pilot: Flight arrived - Flight ID:', newFlight.details.flightID);
  notifyManager(newFlight);
});

// Function to handle flight events
function flightHandler(newFlight) {
  setTimeout(() => {
    console.log(`Pilot: Flight with ID ${newFlight.details.flightID} has taken off.`);
    flight.event = 'took-off';
    flight.time = new Date();
    socket.emit('took-off', flight);
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: Flight with ID ${newFlight.details.flightID} has arrived at the destination.`);
    flight.event = 'Arrived';
    flight.time = new Date();
    socket.emit('Arrived', newFlight);
  }, 7000);
}

// Function to notify the manager about the arrived flight
function notifyManager(paylnewFlightoad) {
  console.log(`Notifying manager about the arrived flight - Pilot: ${newFlight.details.pilot}`);
  // Implement your code here to notify the manager (e.g., send a notification, call an API, etc.)
}

// Disconnect from the socket.io server when the script is terminated
process.on('SIGINT', () => {
  socket.disconnect();
  process.exit(0);
});
