'use strict'


const eventsPool = require('./eventsPool')
require('./manager')

eventsPool.on('new-flight', flightHandler)

function flightHandler(payload){
  
    setTimeout(()=>{
    console.log(`Pilot: flight with ID: ${payload.details.flightID} taken-off`)
     payload.event= 'took-off',
      payload.time=new Date();        
      eventsPool.emit('took-off', payload)
}, 4000);


setTimeout(()=>{
    console.log(`Pilot: flight with ID: ${payload.details.flightID}  Arrived to destination: `)
         payload.event='Arrived',
          payload.time= new Date(), 
        eventsPool.emit('Arrived', payload)
    }, 7000);

}