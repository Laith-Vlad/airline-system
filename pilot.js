'use strict';
const eventsPool = require('./events');
eventsPool.on("pilot" ,(payload) =>{
     setTimeout(() =>{
          console.log(`Pilot: flight with ID ${payload.Details.flightID} took-off`);
          eventsPool.emit('took-off' , payload)
     } , 4000)
     setTimeout(() =>{
          console.log(`The Pilot: flight with ID ${payload.Details.flightID} Arrived`);
          eventsPool.emit('Arrived' , payload)
          console.log(`The Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`);
     },7000)
})
eventsPool.on("took-off" ,(payload) =>{
     payload.event = 'taken_off'
     payload.time = new Date(),

     console.log('Flight : ' , payload);
})
eventsPool.on('Arrived' , (payload) =>{
     payload.event = 'Arrived'
     payload.time = new Date(),

     console.log('Flight : ' , payload);

})