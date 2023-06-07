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
        username: profile.displayName,
        avatar: profile.photos[0].value
      })
      //save user info into db
      await newUser.save()
      return cb(null, newUser)
    }
    console.log(profile)
    return cb(null, doc)
  }
));

/* -------------------- LOCAL STRATEGY -------------------------------------- */

//local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username })
      .then(user => {
        if(!user){
          return done(null, false);
        }
        bcrypt.compare(password, user.password, (err,isMatch) => {
          if(err) throw(err)

          if (isMatch) {
            return done(null,user)
          } else {
            return done(null, false, { message: "Wrong password!" })
          }
        })
      }).catch(err => {
        return done(null, false, { message: err })
      })
  }
))

/*-------------------- SERIALISE AND DESERIALISE USERS ------------------------- */

passport.serializeUser((user, cb) => {
  return cb(null, user._id)
});

passport.deserializeUser(async(id, cb) => {
 try {
    const user = await User.findById(id);
    //omitting password otherwise we will make a big OOPSIE
    const { password, ...others } = user._doc
    cb(null, others);
  } catch(err) {
    cb(err);
  };
});