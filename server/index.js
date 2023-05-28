const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
    .then(console.log('Established connection to database!'))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})