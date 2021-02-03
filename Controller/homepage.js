const express = require('express')
const homepage = express.Router()

homepage.get('/',(req, res)=>{
    res.render('index')
})

module.exports = homepage