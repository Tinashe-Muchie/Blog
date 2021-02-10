const express = require('express')
const middleware = express.Router()

const validation = (req, res, next)=>{
    if(req.files === null || req.body.title === null || req.body.subtitle === null || req.body.body === null){
        return res.redirect('/posts/new')
    }
    next()
}
middleware.use(validation)

module.exports = middleware