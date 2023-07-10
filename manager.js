'use strict'

const { faker } = require('@faker-js/faker'); // here we create the faker i will use it to generate random data for testing
const eventsPool = require('./eventsPool');
const uuid = require('uuid'); 
eventsPool.on('new-flight', flightEventHandler)

function flightEventHandler(payload){
console.log(`THe Manager: new flight with ID: ${payload.details.flightID} have been scheduled.`);
}

setInterval(()=>{
    eventsPool.emit('new-flight', 
               { event: 'new-flight', time: new Date(),
              details: {
                    airLine:'Royal Jordanian Airlines',
                    flightID:uuid.v4(),
                    pilot:faker.person.fullName(),
                    destination:`${faker.location.city()},${faker.location.country()}`

                       }   // this ibject is the payload of the emit that will be sent to the system 
                }
      )
 } ,10000)

setTimeout(()=>{
    eventsPool.on('Arrived',(payload)=>{
        console.log(`Manager: we’re greatly thankful for the amazing flight ${payload.details.pilot}`)
})
},1)

