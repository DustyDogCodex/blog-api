const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcrypt')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')
CLIENT_URL = 'http://localhost:5173'

//Register new users
Router.post(
    '/register', 
    asyncHandler( async(req,res,next) => {
        
        //if username already exists, a 418 status is sent back because you can't brew coffee in a teapot. The route will respond with a 'failed' message which will trigger a bootstrap alert on our frontend. 
        const invalidUsername = await User.findOne({ username: req.body.username })
        if(invalidUsername){
            /* res.status(418) */
            console.log(invalidUsername)
            res.send('failed')
        } else {
            //username is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            //passing req info + hashed pasword into User model
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })

            //saving newUser to db
            const user = await newUser.save()

            //if user account is successfully created, the route will send a success message that will trigger a bootstap alert on the frontend letting the user know an account was created.
            res.send('success')  
        }
    })
)

//Login existing users using passport local strategy
Router.post(
    '/login', 
    async (req,res,next) => {
        passport.authenticate("local", async(err,user,info) => {
            try {
            if (err || !user) {
                const error = new Error("An error occurred.");

                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, username: user.username };
                const token = jwt.sign({ user: body }, process.env.SECRET, {
                expiresIn: "1d",
            });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
})

//simple get request to check if a user is authenticated and retrieve user information
Router.get(
    '/login/success',
    (req,res) => {
        if(req.user) {
            res.json({
                success: true,
                message: "success",
                user: req.user,
                cookies: req.cookies
            });
        }
    }
)

// Similar to login/success except a fail message is sent with no user info.
Router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "fail"
  });
});

//logout user 
Router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
})

module.exports = Router