const { checkPrimeSync } = require('crypto');
const { readFile, writeFile } = require('fs');

console.log('Starting the async task.')
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log({ err })
        return
    }
    const first = result;

    readFile('./content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log({ err })
            return
        }

        const second = result
        writeFile('./content/result-async.txt', `Here is the result: ${first}, ${second}. \n`, (err, result) => {
            if (err) {
                console.log({ err })
                return
            }
            console.log('Task completed.')
            console.log({ result })
        })
    })
})

console.log('After the task.')

// Callback hell
