const EventEmitter = require('events')

const customEmitter = new EventEmitter()

customEmitter.on('response', (name, age) => {                // on - listen
    console.log(`Data recieved ... ${name}, with id: ${age}`)
})

customEmitter.on('response', () => {                // on - listen
    console.log(`Some other logic listening the same event ...`)
})


customEmitter.emit('response', 'john', 34)                      // emit - emit