'use strict';

const eventsPool = require('./events');
require('./pilot')
require('./system')


eventsPool.on('newFlight' , (payload) =>{
    console.log(`the Manager : new flight with ID : ${payload.Details.flightID} has been scheduled.`); 
    console.log(`the Flight : ` , payload); 
})