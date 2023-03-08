const mongoose = require('mongoose');

const connectionString = "mongodb+srv://dbUser:0fNHUN2XG9ouxId2@freecc.d7ccarv.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority&useUnifiedTopology=true";

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the DB..."))
    .catch((err) => console.log({ err }))