const asyncHandler = require('express-async-handler')
const Post = require('../models/Posts')

//Route for creating new blog posts
const createNewBlog = (
    '/new',
    asyncHandler(async(req,res) => {
        //extract blog info from req.body
        const { userId, username, title, subtitle, post, categories } = req.body  

        //create new post
        const newPost = new Post({
            username,
            userId,
            title,
            subtitle,
            post,
            image: req.file ? req.file.filename : '',
            categories: categories ? categories.split(',') : ''
        })
        
        //save new post
        await newPost.save()
        
        res.status(200).send('success')
    })
)

module.exports = { createNewBlog }