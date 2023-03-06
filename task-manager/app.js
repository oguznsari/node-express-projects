console.log('Task Manager App')

const express = require('express');
const app = express();
const tasks = require('./routes/tasks')

// middleware
app.use(express.json())

const PORT = 3000;

// Routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))