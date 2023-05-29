const express = require('express')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const Router = express.Router()

const User = require('../models/Users')

//Route for updating user information
Router.put(
    '/:id', 
    asyncHandler( async(req,res,next) => {
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



module.exports = Router