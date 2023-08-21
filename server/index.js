const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
//all imported routes and controllers
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const passportConfig = require('./passportConfig')
const { createNewBlog, updateBlog } = require('./controllers/posts')
const { registerAccount } = require('./controllers/auth')

dotenv.config()

const app = express()

app.use(cors({ 
    origin: ['http://localhost:5173'],
    credentials: true 
}))
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

/* ------------ Express sessions and Passportjs ---------------------- */ 
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: { 
        sameSite: "lax",
        secure: 'auto',  //for dev environment
        maxAge: 24 * 60 * 60 * 1000 //one day 
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))

//creating local variables using middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user
    next()
})

/* ------------------------------------------------------------------ */

/* -------------ROUTES INVOLVING FILE UPLOAD ------------------------ */

//setting up storage for user uploaded files using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "server/images")
    }, 
    filename: (req, file, cb) => {
        //randomizing file name to avoid filename conflicts
        cb(null, Date.now() + "-" + Math.round((Math.random() * 1E9)) + ".jpg")
    }
})

const upload = multer({ storage })

//routes involving image uploads
app.post('/auth/register', upload.single("image"), registerAccount)
app.post('/post/new', upload.single("image"), createNewBlog)
app.put('/post/:id', upload.single("image"), updateBlog)

/* ------------------------------------------------------------------ */

//static folder containing uploaded user images
app.use('/uploads', express.static('server/images'))

/* ---------------------ROUTES---------------------------------- */

//routes for registering and authenticating users
app.use('/auth', authRoute)     
//routes for user account CRUD ops
app.use('/user', userRoute)  
//routes for blog post CRUD ops   
app.use('/post', postRoute)    
//routes for categories
app.use('/category', categoryRoute) 

/* ------------------------------------------------------------  */

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})