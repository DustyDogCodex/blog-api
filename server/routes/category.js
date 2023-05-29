const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

const Category = require('../models/Category')

//route for getting all available categories
Router.get(
    '/',
    asyncHandler(async(req,res,next) => {
        const categories = await Category.find()
        res.status(200).json(categories)
    })
)

//route for creating a new category. 
//Removed code for checking uniqueness since I added a unique property to category schema
Router.post(
    '/',
    asyncHandler(async(req,res,next) => {
        const newCategory = new Category(req.body)
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    })
)

module.exports = Router