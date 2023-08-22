const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()
const { updateAboutMe } = require('../controllers/settings')

//importing user model
const User = require('../models/Users')

//update about me route
Router.put('/aboutMe', updateAboutMe )

module.exports = Router