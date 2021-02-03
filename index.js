const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const homepage = require('./Controller/homepage')
const about = require('./Controller/about')
const post = require('./Controller/post')
const contact = require('./Controller/contact')
const create = require('./Controller/create')
const app = express()
const db = mongoose.connect(
    'mongodb://localhost/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then( connection => connection)
.catch(console.error)

app.use((req, res, next)=>{
    Promise.resolve(db).then(
        (connection, error)=>{
        typeof connection !== undefined
        ? next()
        : next(new Error('MongoError'))
        })
})
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(homepage)
app.use(about)
app.use(post)
app.use(contact)
app.use(create)



app.listen(
    4000, console.log('Web Server listening on port 4000')
)