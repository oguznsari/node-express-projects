const MongoBackend = require("./services/backend/MongoBackend");
require("dotenv").config();


async function run() {
  const mongoBackend = new MongoBackend();
  return mongoBackend.max();
}

run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
