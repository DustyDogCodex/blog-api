const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const bcrypt = require('bcrypt')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')

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
    passport.authenticate("local"),
    (req,res,next) => {
        
    }
)

//simple get request to check if a user is authenticated
Router.get(
    '/login-success',
    asyncHandler((req,res,next) => {
        if(req.isAuthenticated()){
            res.send('true')
        } else {
            res.send('false')
        }
    })
)

//logout user 
Router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:5173/");
  });
})

module.exports = Router