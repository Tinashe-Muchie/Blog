const express = require('express')
const create = express.Router()

create.get('/newpost', (req, res)=>{
    res.render('create')
})

module.exports = create