const asyncHandler = require('express-async-handler')
const fs = require('fs')
const Post = require('../models/Posts')

/* -------------------CREATE NEW POST ----------------------------- */
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
/* -------------------------------------------------------------------- */

/* ----------------------UPDATE NEW POST------------------------------- */

const updateBlog = (
    '/:id',
    asyncHandler(async(req,res) => {
        //grab post id from params
        const { id } = req.params
        
        //grabbing info from req.body
        const { title, subtitle, post, categories, newImage } = req.body

        //find relevant post
        const selectedPost = await Post.findById(id)

        let updatedImagePath = selectedPost.image
        
        //if newImage was uploaded or previous image was removed, delete prev image 
        if( newImage ){
            //if there's an image with the post, delete that image. if no image, skip to next step
            if(selectedPost.image){
                //delete prev image if new image is uploaded
                fs.unlink('server/images/' + selectedPost.image, (err) => {
                    if (err) {
                        console.log(err)
                    }
                })
            }

            //set updatedImagePath to new image path or empty string if undefined
            //if req.file is undefined with newImage being true, the user has deleted the associated image 
            updatedImagePath = req.file ? req.file.filename : ''
        }

        //find post by Id and update it
        await Post.findByIdAndUpdate(
            id, 
            {
                title,
                subtitle,
                post,
                image: updatedImagePath,
                categories: categories ? categories.split(',') : ''
            }, 
            { new: true }
        )  
        
        //send success message and updated to allow client to redirect appropriately
        res.status(200).send('updated') 
    })
)

/* -------------------------------------------------------------------- */

module.exports = { createNewBlog, updateBlog }