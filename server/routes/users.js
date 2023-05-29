const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Router = express.Router()

const User = require('../models/Users')
const Post = require('../models/Posts')

//Route for getting user account info
Router.get(
    '/:id',
    asyncHandler(async(req,res,next) => {
        const user = await User.findById(req.params.id)
        //taking out the password as it shouldn't be shown publicly. All other info from the selected user document is passed into the others object using javascript's rest property.
        const { password, ...others } = user._doc
        res.status(200).json(others)
    })
)

//Route for updating user information
Router.put(
    '/:id', 
    asyncHandler(async(req,res,next) => {
        if(req.body.userId === req.params.id){
            //checking for an update password. If user is sending a new password, this block will hash it before storing
            if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }

            //update saved user info
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json(updatedUser)
        } else {
            //if userId is different from params, this is not the correct users account!
            res.status(401).json("You are not authorised to update this account!")
        }
    })
)

//Route for deleting user account
Router.delete(
    '/:id', 
    asyncHandler(async(req,res,next) => {
        if(req.body.userId === req.params.id){
            //find selected user account in our database
            const user = await User.findById(req.params.id)
            if(user){
                //if user account is found
                //first we delete all associated posts from that account
                await Post.deleteMany({ username: user.username })

                //then we delete selected user account by deleting its document
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json('User account has been deleted!')
            } else {
                res.status(404).json('User account was not found!')
            }
            
        } else {
            //if userId is different from params, this is not the correct users account!
            res.status(401).json("You are not authorised to delete this account!")
        }
    })
)

module.exports = Router