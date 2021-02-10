const express = require('express')
const BlogPost = require('../Models/BlogPost')
const path = require('path')
const create = express.Router()

create.get('/new', (req, res)=>{
    res.render('create', {
        createPost: true
    })
})

create.post('/store', (req, res)=>{
    let image = req.files.image
    let uploadPath = path.resolve(__dirname, '../public/img', image.name)
    image.mv(uploadPath, async function(error){
        if (error)
        return res.status(500).send(error)

        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name,
            userId: req.session.user
        })
        res.redirect('/')
    })
})

module.exports = create