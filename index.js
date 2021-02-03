const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const homepage = require('./Controller/homepage')
const about = require('./Controller/about')
const post = require('./Controller/post')
const contact = require('./Controller/contact')
const app = express()
const db = mongoose.connect(
    'mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(homepage)
app.use(about)
app.use(post)
app.use(contact)



app.listen(
    4000, console.log('Web Server listening on port 4000')
)