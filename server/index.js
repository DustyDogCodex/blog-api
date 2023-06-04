const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const dotenv = require('dotenv')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser"); // parse cookie header
//all imported routes
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(flash())
// parse cookies
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: process.env.COOKIE_KEY,
    maxAge: 24 * 60 * 60 * 100
  })
);

//mongodb connection setup
mongoose.connect(process.env.MONGO_URL)
.then(console.log('Established connection to database!'))
.catch(err => console.log(err))

//import User model
const User = require('./models/Users')

//setting up passport local strategy
passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
        bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
            // passwords match! log user in
            return done(null, user)
        } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
        }         
        })
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

//setting up express sessions and initializing passportjs
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: true } 
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