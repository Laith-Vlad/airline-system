const eventsPool = require('./eventsPool')

require('./manager')
require('./pilot')

eventsPool.on('new-flight', newFlight)
eventsPool.on('took-off', takenOffFlight)
eventsPool.on('Arrived', arrived)

function arrived(payload){
    console.log("Flight:", payload)

}
function takenOffFlight(payload){
    console.log("Flight:", payload)

}

function newFlight(payload){
    console.log("Flight:", payload) 
}
