/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const mongoose = require("mongoose");

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

  async insert() { }

  async getMax() { }

  async max() {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    await this.connect();
    console.timeEnd("mongodb-connect");

    console.info("Disconnecting from MongoDB");
    console.time("mongodb-disconnect");
    await this.disconnect();
    console.timeEnd("mongodb-disconnect");
  }
}

module.exports = MongoBackend;