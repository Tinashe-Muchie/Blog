const express = require('express')
const User = require('../Models/User')
const userApi = express.Router()

// check whether the user is logged on
const isLogged = (({session}, res, next)=>{
    (!session.user)
    ? res.status(403).json({
        status: 'You are not logged in'
    })
    : next()
})

// check whether the user is not logged in
const isNotLogged = (({session}, res, next)=>{
    (session.user)
    ? res.status(403).json({
        status: 'You are already logged in'
    })
    : next()
})


userApi.post('/login', isNotLogged, async function(req, res){
   try{
    const {session, body} = req
    const {username, password} = body
    const user = await User.login(username, password)
    session.user = {
        _id: user._id,
        username: user.username
    }
    session.save()
    res.redirect('/posts/new')
   } catch(error){
       req.flash('loginError', error.message)
       return res.redirect('/users/login')
   }
})
userApi.post('/signup', async function(req, res){
    try{
        const {body} = req
        const {username, password} = body
        const user = await User.signup(username, password)
        res.redirect('/users/login')
    } catch(error) {
        req.flash('validationError', error.message)
        return res.redirect('/users/signup')
    }
})
userApi.post('/logout', isLogged, function(req, res){
    req.session.destroy()
    res.redirect('/')
})

userApi.get('/signup',(req, res)=>{
    res.render('register', {
        errors: req.flash('validationError'),
    })
})
userApi.get('/login',(req, res)=>{
    res.render('login', {
        err: req.flash('loginError'),
    })
})

module.exports = userApi
