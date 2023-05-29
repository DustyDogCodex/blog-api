const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//route for authenticating users through /register and /login routes.
app.use('/auth', authRoute)
app.use('/user', userRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})