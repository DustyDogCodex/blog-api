const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
require('dotenv').config()

//import User model for local strategy
const User = require('./models/Users')

/* -------------------- GOOGLE STRATEGY -------------------------------------- */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    //checking to see if user already exists
    const doc = await User.findOne({ googleId: profile.id })

    //if user doesn't exist, create user in database
    if(!doc){
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName
      })
      //save user info into db
      await newUser.save()
    }
    console.log(profile)
    return cb(null, profile)
  }
));

passport.serializeUser((user, cb) => {
  /* process.nextTick(function() {
    cb(null, { id: user._id, username: user.username });
  }); */
  return cb(null, user)
});

passport.deserializeUser((user, cb) => {
  /* process.nextTick(function() {
    return cb(null, user);
  }); */
  return cb(null, user)
});

/* -------------------- LOCAL STRATEGY -------------------------------------- */

//local strategy
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

/* passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
}); */