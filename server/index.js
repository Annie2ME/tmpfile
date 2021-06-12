// Dependencies
const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const stocks = require('./routes/api/stocks')
app.use('/api/stocks', stocks)

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'))

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server started on port ${port}`))