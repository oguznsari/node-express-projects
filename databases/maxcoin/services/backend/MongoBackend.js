/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const mongoose = require("mongoose");
const Values = require("../models/Values");

const CoinAPI = require('../CoinAPI');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = process.env.MONGO_URI;
    this.client = null;
    this.collection = null;
  }

  async connect() {
    return mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  async disconnect() {
    return mongoose.connection.close();
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    const documents = [];
    Object.entries(data.bpi).forEach((entry) => {
      documents.push({
        date: entry[0],
        value: entry[1]
      });
    });

    return Values.insertMany(documents);
  }

  async getMax() {
    const result = Values.findOne(
      {},
      { date: 1, value: 1 },
      { sort: { value: 1 } }
    );

    return result;
  }

  async max() {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    await this.connect();
    console.timeEnd("mongodb-connect");

    console.info("Inserting into MongoDB");
    console.time("mongodb-insert");
    const insertResult = await this.insert();
    console.timeEnd("mongodb-insert");
    console.info(`Inserted ${insertResult.length} documents into MongoDB.`);

    console.info("Querying MongoDB");
    console.time("mongodb-find");
    const doc = await this.getMax();
    console.timeEnd("mongodb-find");

    console.info("Disconnecting from MongoDB");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");

    return {
      date: doc.date,
      value: doc.value
    }
  }
}

module.exports = MongoBackend;