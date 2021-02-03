const express = require('express')
const about = express.Router()

about.get('/about', (req, res)=>{
    res.render('about')
})

module.exports = about