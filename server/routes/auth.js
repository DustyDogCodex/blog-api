const express = require('express')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
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

//Login existing users. Using bcrypt compare now instead of passport local
//app is small enough to justify not using passport
Router.post(
    '/login', 
    asyncHandler( async (req,res,next) => {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        //separating password from other user account settings.
        const { password, ...others } = user._doc;

        //signing jwt to send as cookie
        jwt.sign(others, process.env.JWT_SECRET, {}, (err,token) => {
            if (err) throw err
            res.cookie('token', token).send('Grab some milk for your cookie!')
        })
}))

//simple get request to check if a user is authenticated and retrieve user information
Router.get(
    '/getuser',
    (req,res) => {
        res.send(req.user)
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
Router.get(
    "/logout", 
    (req, res) => {
    req.logout()
    res.send('success')
})

//google login authentication
Router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//google callback function after user is authenticated
Router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true, session: true }),
  function(req, res) {
    res.redirect('http://localhost:5173');
  });

module.exports = Router