const mongoose = require('mongoose')
const { connection, Schema } = mongoose

const BlogSchema = new Schema ({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    body: {type: String, required: true},
    username: {type: String},
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String,
})

const BlogPost = connection.model('BlogPost', BlogSchema)

module.exports = BlogPost