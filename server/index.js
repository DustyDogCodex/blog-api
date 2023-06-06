const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
//all imported routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const passportConfig = require('./passportConfig')

dotenv.config()

const app = express()
app.use(cors({ 
  origin:'http://localhost:5173',
  credentials: true }))
app.use(express.json())

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//setting up express sessions and initializing passportjs
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true,
  cookie: { 
    sameSite: "none",
    secure: false,  //for dev environment
    maxAge: 24 * 60 * 60 * 1000 //one day 
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

//creating local variables using middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//setting up storage for user uploaded files using multer.
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