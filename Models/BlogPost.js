const mongoose = require('mongoose')
const { connection, Schema } = mongoose

const BlogSchema = new Schema ({
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    body: {type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String,
})

const BlogPost = connection.model('BlogPost', BlogSchema)

module.exports = BlogPost