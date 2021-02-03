const mongoose = require('mongoose')
const { connection, Schema } = mongoose

const BlogSchema = new Schema ({
    title: {type: String, required: true},
    body: {type: String, required: true},
})

const BlogPost = connection.model('BlogPost', BlogSchema)

module.exports = BlogPost