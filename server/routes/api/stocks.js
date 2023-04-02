const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

require('dotenv').config()

// Get stocks
router.get('/', async (req, res) => {
  const stocks = await loadStocks()
  res.send(await stocks.find({}).toArray())
})

// Get specific stock
router.get('/:ticker', async (req, res) => {
  const stocks = await loadStocks()
  res.send(await stocks.findOne({"Ticker": req.params.ticker}))
})

// Get top 10 stocks of the day
router.get('/top/overall', async (req, res) => {
  const stocks = await loadStocks()
  displayParams = {"Ticker": 1, "Price": 1, "Change from Open": 1, "Volume": 1, "52-Week High": 1, "52-Week Low": 1, "_id": 0}
  res.send(await stocks.find({}).project(displayParams).sort("Change from Open", -1).limit(10).toArray())
})

// Get top 10 stocks of the day by industry
router.get('/top/:industry', async (req, res) => {
  const stocks = await loadStocks()
  displayParams = {"Ticker": 1, "Price": 1, "Change from Open": 1, "Volume": 1, "52-Week High": 1, "52-Week Low": 1, "_id": 0}
  res.send(await stocks.find({"Industry": req.params.industry}).project(displayParams).sort("Change from Open", -1).limit(10).toArray())
})

// Get industries
router.get('/get/industries', async (req, res) => {
  const stocks = await loadStocks()
  res.send(await stocks.distinct("Industry"))
})

// Get tickers
router.get('/get/tickers', async (req, res) => {
  const stocks = await loadStocks()
  res.send(await stocks.distinct("Ticker"))
})

// Create stock
router.post('/', async (req, res) => {
  const stocks = await loadStocks()
  await stocks.insertOne(
    req.body
  )
  res.status(201).send
})

// Update stock
router.patch('/:id', async (req, res) => {
  const stocks = await loadStocks()
  let set = {}
  set[req.body.updateKey] = req.body.updateValue
  await stocks.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $set: set }
  )
  res.status(201).send
})

// Delete field
router.patch('/remove/:id', async (req, res) => {
  const stocks = await loadStocks()
  let set = {}
  set[req.body.updateKey] = req.body.updateValue
  await stocks.updateOne(
    { _id: new mongodb.ObjectID(req.params.id) },
    { $unset: set }
  )
  res.status(201).send
})

// Delete stock
router.delete('/:id', async (req, res) => {
  const stocks = await loadStocks()
  await stocks.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

// Connect to MongoDB client
async function loadStocks() {
  const client = await mongodb.MongoClient.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
  )
  
  return client.db('market').collection('stocks')
}

module.exports = router