const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//routes for registering and authenticating users
app.use('/auth', authRoute)     
//routes for user account CRUD ops
app.use('/user', userRoute)  
//routes for blog post CRUD ops   
app.use('/post', postRoute)     

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})