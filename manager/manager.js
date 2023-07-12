'use strict';

const socketIOClient = require('socket.io-client');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

// Load environment variables from .env file
dotenv.config();

// Get the server URL and port from the environment variables
const serverUrl = `http://localhost:${process.env.PORT || 3000}`;

// Connect to the socket.io server
const socket = socketIOClient(serverUrl);

// Handle 'connect' event
socket.on('connect', () => {
  console.log('Connected to the socket.io server');

  // Generate and emit random flight data every 10 seconds
  setInterval(() => {
    const newFlight = {
      event: 'new-flight',
      time: new Date(),
      details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: uuid.v4(),
        pilot: faker.person.fullName(),
        destination: `${faker.location.city()}, ${faker.location.country()}`
      }
    };
    socket.emit('new-flight', newFlight);
  }, 10000);
});

// Handle 'new-flight' event
socket.on('new-flight', (flight) => {
  console.log(`New flight scheduled - Flight ID: ${flight.details.flightID}`);
});

// Handle 'Arrived' event
socket.on('Arrived', (flight) => {
  console.log(`Flight arrived - Pilot: ${flight.details.pilot}`);
  notifyManager(flight);
});

// Function to notify the manager about the arrived flight
function notifyManager(flight) {
  console.log(`Notifying manager about the arrived flight - Pilot: ${flight.details.pilot}`);
  // Implement your code here to notify the manager (e.g., send a notification, call an API, etc.)
}

// Disconnect from the socket.io server when the script is terminated
