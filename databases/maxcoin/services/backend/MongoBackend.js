/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const { MongoClient } = require("mongodb");

const CoinAPI = require('../CoinAPI');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = process.env.MONGO_URI;
    this.client = null;
    this.collection = null;
  }

  async connect() {
    console.log({ url: this.mongoUrl })
    const mongoClient = new MongoClient(
      this.mongoUrl,
      { useUnifiedTopology: true, useNewUrlParser: true });

    this.client = mongoClient.connect();
    this.collection = this.client.db("maxcoin").collection("values");
    return this.client;
  }

  async disconnect() { }

  async insert() { }

  async getMax() { }

  async max() {
    console.info("Connection to MongoDB");
    console.time("mongodb-connect");
    const client = await this.connect();
    if (client.isConnected()) {
      console.info("Successfully connected to MongoDB")
    } else {
      throw new Error("Connecting to MongoDB failed")
    }

    console.timeEnd("mongodb-connect");
  }
}

module.exports = MongoBackend;