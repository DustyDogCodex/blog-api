const express = require('express')
const asyncHandler = require('express-async-handler')
const Router = express.Router()

const Post = require('../models/Posts')

//Route for getting ALL blog posts belonging to a user or a category
Router.get(
    '/',
    asyncHandler(async(req,res) => {
        //identifying the query sent in the request
        const username = req.query.username
        const category = req.query.category
        
        //posts will be assigned depending on what query is received.
        //if no query, it will fetch all posts.
        let posts
        if(username){
            posts = await Post.find({ username })
        } else if (category) {
            posts = await Post.find({ categories: {
                $in: [category]
            } })
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    })
)

//fetching all posts from a single user
Router.get(
    '/user/:userId',
    asyncHandler(async(req,res) => {
        //grabbing userId from params
        const { userId } = req.params

        //find posts with associated userid
        const posts = await Post.find({ userId })

        //send posts to client
        res.status(200).send(posts)
    })
)

//Route for getting a selected blog post by id
Router.get(
    '/:id',
    asyncHandler(async(req,res) => {
        const post = await Post.findById(req.params.id)
        
        res.status(200).json(post)
    })
)

//Route for updating a blog post
Router.put(
    '/:id',
    asyncHandler(async(req,res) => {
        //grab post id from params
        const { id } = req.params
        
        //find post by Id and update it
        await Post.findByIdAndUpdate(
            id, 
            {
                $set: req.body
            }, 
            { new: true }
        )  
        
        //send success message and updated to allow client to redirect appropriately
        res.status(200).send('updated') 
    })
)

//Route for deleting a blog post
Router.delete(
    '/:id',
    asyncHandler(async(req,res) => {
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
            res.status(401).json('Naughty boy you can only delete your own posts!')
        }
    })
)

module.exports = Router