const express = require('express')
const contact = express.Router()

contact.get('/contact',(req, res)=>{
    res.render('contact')
})

module.exports = contact