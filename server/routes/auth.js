const express = require('express')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const LocalStrategy = require('passport-local')
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
            email: req.body.email,
            password: hashedPassword,
            avatar: req.body.avatar
        })

        //saving newUser to db
        const user = await newUser.save()

        res.status(200).json(user)
    })
)

//Login existing users
Router.post(
    '/login', 
    asyncHandler( async(req,res,next) => {

        //locate username from req in our DB
        const user = await User.findOne({ username: req.body.username })
        
        //if username doesn't exist, send an error
        !user && res.status(400).json("Invalid username!")
        
        //if username exists, compare passwords
        const authenticate = await bcrypt.compare(req.body.password, user.password)
        !authenticate && res.status(400).json("Incorrect Credentials! Please try again!")
        
        res.status(200).json(authenticate)
    })
)


module.exports = Router