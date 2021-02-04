const express = require('express')
const BlogPost = require('../Models/BlogPost')
const create = express.Router()

create.get('/new', (req, res)=>{
    res.render('create')
})

create.post('/store', async (req, res)=>{
    console.log(req.body)
    await BlogPost.create(req.body)
    res.redirect('/')
})

module.exports = create