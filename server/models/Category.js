const mongoose = require('mongoose')
const { Schema } = mongoose

//this is our schema for storing categories that were assigned to posts
//very simple model since we only need a name for the category and nothing else

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Category', CategorySchema)