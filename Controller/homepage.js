const express = require('express')
const BlogPost = require('../Models/BlogPost')
const homepage = express.Router()


homepage.get('/', async (req, res)=>{
    const blogposts = await BlogPost.find({}).populate('userId')
    res.render('index', {
        blogposts
    })
})

module.exports = homepage