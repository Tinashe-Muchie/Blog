const express = require('express')
const User = require('../Models/User')
const userApi = express.Router()

// request handler to check whether the user is logged on
const isLogged = (({session}, res, next)=>{
    (!session.user)
    ? res.status(403).json({
        status: 'You are not logged in'
    })
    : next()
})

// request handler to chech whether the use is not logged in
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
    session.save(()=>{
        res.status(200).json({
            status: 'Welcome'
        })
    })
   } catch(error){
       res.status(403).json({error: error.message})
   }
})
userApi.post('/logout', isLogged, function(req, res){
    req.session.destroy()
    res.status(200).json({
        status: 'Bye Bye'
    })
})
userApi.post('/signup', async function(req, res){
    try{
        const {body} = req
        const {username, password} = body
        const user = await User.signup(username, password)
        res.status(201).json({
            status: 'Created'
        })
    } catch(error) {
        res.status(403).json({error: error.message})
    }
})

userApi.get((req, res)=>{
    res.render('register')
})
userApi.get((req, res)=>{
    res.render('login')
})

module.exports = userApi