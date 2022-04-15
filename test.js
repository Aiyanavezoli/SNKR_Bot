const snkrBot = require('./bot')
const cron = require('node-cron')
let counter = 1
let date = new Date()
console.log(date.toLocaleTimeString())
corn.schedule('* * * * *', () =>{
    console.log(counter)
    counter += 1
    date = new Date()
    console.log(date.toLocaleTimeString())
})