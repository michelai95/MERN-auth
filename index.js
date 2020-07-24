require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')

// inititalize express server 
const app = express()

// require router 
// const users = require('./routes/api/users')

// middleware to allow for CORS request 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept- Authorization")
    res.header('Access-Control-Allow-Methods', "POST, GET, OPTIONS, PUT, DELETE")
    next()
})
// bodyParser middleware - isn't always required 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// configure our DB 
const db = process.env.MONGODB_URI

// connect to MongoDB
mongoose.connect(db)
    .then((() => console.log('MongoDB connected 🥭')))
    .catch(err => console.log(err))

// test routing 

// passport middleware 

// passport JWT token set/config

// setup routes 

// start server 
app.listen(process.env.PORT || 5000, () => console.log(`Server is running on ${process.env.PORT} and things are looking good 🥳`))