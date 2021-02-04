const express = require('express')
const BlogPost = require('../Models/BlogPost')
const homepage = express.Router()


homepage.get('/', async (req, res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

module.exports = homepage