const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//importing UserSchema
const User = require('../models/Users')

const registerAccount =(
    asyncHandler(async(req,res) => {
        //grabbing info from req.body
        const { username, password, } = req.body
        
        //checking for duplicate username
        const invalidUsername = await User.findOne({ username })

        if(invalidUsername){
            //if username is a duplicate, a failed message is sent to client to display appropriate alert
            res.status(500).send('failed')
        } else {
            //username is unique, we can proceed with saving user information
            //generating salt
            const salt = await bcrypt.genSalt(10)
            //hashing password
            const hashedPassword = await bcrypt.hash(password, salt)

            //passing req info + hashed pasword into User model
            const newUser = new User({
                username,
                password: hashedPassword
            })

            //saving newUser to db
            await newUser.save()

            //if user account is successfully created, the route will send a success message that will trigger a bootstap alert on the frontend letting the user know an account was created.
            res.status(200).send('success')  
        }
    })
)

module.exports = { registerAccount }