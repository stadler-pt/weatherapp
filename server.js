// Data of searches
let objectData = []

// Set up server
const express = require('express')
const app = express()

// Dependencies
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

// Set main project folder
app.use(express.static("weather"))

// Start server
const port = 8001
const server = app.listen(port, ()=>{
    console.log(`running on localhost: ${port}`)
})

// Display main folder
app.get('/', function (req, res) {
  res.send("weather")
})

// Get data from data array
app.get('/getData', function (req, res) {
    res.send(objectData)
})

// Send data to data array
app.post('/addData', (req, res) => {
    objectData.push(req.body)
})