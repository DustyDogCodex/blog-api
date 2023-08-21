const express = require('express')
const asyncHandler = require('express-async-handler')
const fs = require('fs')
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

//Route for deleting a blog post
Router.delete(
    '/:id',
    asyncHandler(async(req,res) => {
        //grab post id from req
        const { id } = req.params

        //find selected post
        const selectedPost = await Post.findById(id)

        //delete any images associated with post from server
        if(selectedPost.image){
            fs.unlink('server/images/' + selectedPost.image, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }

        //delete post
        await Post.findByIdAndDelete(id) 
                
        res.status(200).send('deleted')
    })
)

module.exports = Router