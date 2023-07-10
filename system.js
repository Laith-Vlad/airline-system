'use strict';
const faker = require('faker');
const eventsPool = require('./events');
require('./pilot');
require('./manager');

eventsPool.on('controls', () => {
  setInterval(() => {
    const flight = {
      event: 'new-flight',
      time: new Date(),
      Details: {
        airLine: 'Royal Jordanian Airlines',
        flightID: faker.datatype.uuid(),
        pilot: faker.name.firstName(),
        destination: faker.address.city(),
      },
    };

    eventsPool.emit('new-flight', flight);
    eventsPool.emit('pilot', flight);
  }, 10000);
});

eventsPool.emit('controls');

