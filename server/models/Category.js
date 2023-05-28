const mongoose = require('mongoose')
const { Schema } = mongoose

//this is our schema for storing blog post information
//using timestamps to get createdAt and updatedAt info for user accounts
//setting title to unique to prevent posts from having duplicate titles.
//setting categories to type Arraya since users can add multiple categories to their posts.

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true } )

module.exports = mongoose.model('Category', CategorySchema)