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

        res.status(200).json(user)
    })
)

//Login existing users using passport local strategy
Router.post(
    '/login', 
    passport.authenticate("local", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login"
    })
)

//simple get request to check is a user is authenticated
Router.get(
    '/login-success',
    asyncHandler((req,res,next) => {
        if(req.isAuthenticated()){
            res.status(200).json('true')
        } else {
            res.status(401).json('false')
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