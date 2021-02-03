const express = require('express')
const post = express.Router()

post.get('/post', (req, res)=>{
    res.render('post')
})

module.exports = post