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
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    })
)

//Route for updating a blog post
Router.put(
    '/:id',
    asyncHandler(async(req,res,next) => {
        const post = await Post.findById(req.params.id)
        
        //checking to see if the correct user is updating this post
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })  
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json('You can only update your own posts!')
        }
    })
)

//Route for deleting a blog post
Router.delete(
    '/:id',
    asyncHandler(async(req,res,next) => {
        const post = await Post.findById(req.params.id)
        
        //checking to see if the correct user is deleting this post
        if(post.username === req.body.username){
            try {
                await Post.findByIdAndDelete(req.params.id) 
                res.status(200).json('Post was deleted!')
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json('You can only delete your own posts!')
        }
    })
)

module.exports = Router