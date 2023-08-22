const asyncHandler = require('express-async-handler')
const fs = require('fs')

//importing user model
const User = require('../models/Users')

/* -----------------------UPDATE ABOUT ME -------------------------------- */
const updateAboutMe = asyncHandler(
    async(req,res) => {
        //extracting userId and location from req.body
        const { userId, aboutMe } = req.body
        
        //find relevant user and update their location
        await User.findByIdAndUpdate(
            userId,
            { aboutMe },
            { new: true }
        )

        res.status(204).send('updated')
    }
)

/* ------------------- UPDATE PROFILE PIC -------------------------------- */

const updateProfilePic = asyncHandler(
    async(req,res) => {
        const { userId } = req.body

        //find relevant user 
        const user = await User.findById(userId)
        
        //delete previous user profile pic from server
        if(user.avatar){
            fs.unlink('server/images/' + user.avatar, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }

        //update user profile pic
        await User.findByIdAndUpdate(
            userId,
            { avatar: req.file ? req.file.filename : '' },
            { new: true }
        )

        res.status(200).send('updated')
    }
)

module.exports = { updateAboutMe, updateProfilePic  }