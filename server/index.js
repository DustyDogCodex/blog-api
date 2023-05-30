const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
//all imported routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//setting up file system storage for user uploaded files.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/images")
    }, 
    filename: (req, file, cb) => {
        cb(null, "hello.jpg")
    }
})

//setting up multer to store uploaded files.
const upload = multer({ storage: storage })
app.post(
    '/upload',
    upload.single("file"),
    (req,res) => {
        res.status(200).json('File uploaded!')
    }
)

//routes for registering and authenticating users
app.use('/auth', authRoute)     
//routes for user account CRUD ops
app.use('/user', userRoute)  
//routes for blog post CRUD ops   
app.use('/post', postRoute)    
//routes for categories
app.use('/category', categoryRoute) 

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})