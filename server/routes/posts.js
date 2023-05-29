const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

const User = require('../models/Users')
const Post = require('../models/Posts')

//Route for getting a blog post
/* Router.get() */

//Route for creating new blog posts
Router.post(
    '/',
    asyncHandler(async(req,res,next) => {
        const newPost = new Post({
            title: req.body.title,
            summary: req.body.summary,
            image: req.body.image,
            username: req.body.username,
            categories: req.body.categories
        })
        const savedPost = newPost.save()
        res.status(200).json(savedPost)
    })
)

//Route for updating a blog post
/* Router.put() */


//Route for deleting a blog post
/* Router.delete() */

module.exports = Router