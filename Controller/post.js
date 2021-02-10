const express = require('express')
const BlogPost = require('../Models/BlogPost')
const post = express.Router()

post.get('/post/:_id', async (req, res)=>{
    const blogpost = await BlogPost.findById(req.params._id).populate('userId')
    res.render('post', {
        blogpost
    })
})

module.exports = post