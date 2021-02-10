const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const homepage = require('./Controller/homepage')
const post = require('./Controller/post')
const create = require('./Controller/create')
const validation = require('./Middleware/validation-middleware')
const userApi = require('./Controller/User')
const app = express()
const db = mongoose.connect(
    'mongodb+srv://new-user_Tinashe:BQlzB3GJxOgtg8zO@cluster0.wwzbb.mongodb.net/my_database', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
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
app.use(session({
    secret: 'blog project',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        collection: 'sessions',
        mongooseConnection: mongoose.connection,
    })
}))
app.use(flash())
app.use(express.static('public'))
app.set('Views', path.join(__dirname, 'Views'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use('/posts/store', validation)
global.loggedIn = null
app.use('*', (req, res, next)=>{
    loggedIn = req.session.user
    next()
})

app.use(homepage)
app.use(post)
app.use('/posts',create)
app.use('/users', userApi)

app.use((req, res)=> res.render('notfound'))


app.listen(
    4000, console.log('Web Server listening on port 4000')
)