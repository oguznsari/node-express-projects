const { readFile, writeFile } = require('fs');
const util = require('util');
const readFilePromise = util.promisify(readFile);
const writeFilePromise = util.promisify(writeFile);

/*
const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
*/

/* 
getText('./content/first.txt')
    .then((result) => console.log({ result }))
    .catch((err) => console.log({ err }))
*/


// async - await approach -> wrap code with Try/Catch
const start = async () => {
    try {
        const first = await readFilePromise('./content/first.txt', 'utf8')
        const second = await readFilePromise('./content/second.txt', 'utf8')
        console.log({ first, second })
        await writeFilePromise('./content/promisify-output.txt', `This is awasome: \n ${first} \n ${second} \n`, { flag: 'a' })
    } catch (error) {
        console.log({ error })
    }
}

start();