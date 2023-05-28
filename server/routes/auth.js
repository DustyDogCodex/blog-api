const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

//importing UserSchema
const User = require('../models/Users')

//Register new users
Router.post(
    '/register', 
    asyncHandler( async(req,res,next) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        })

        const user = await newUser.save()
        res.status(200).json(user)
    })
)

//Login existing users
