const asyncHandler = require('express-async-handler')
const Post = require('../models/Posts')

//Route for creating new blog posts
const createNewBlog = (
    '/new',
    asyncHandler(async(req,res) => {
        //extract blog info from req.body
        const { username, title, post, categories } = req.body 

        //checking for uploaded image
        const imagePath = req.file ? req.file.filename : ''

        //create new post
        const newPost = new Post({
            username,
            title,
            post,
            image: imagePath,
            categories
        })
        
        //save new post
        await newPost.save()
        
        res.status(200).send('success')
    })
)

module.exports = { createNewBlog }