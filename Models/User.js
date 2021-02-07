const mongoose = require('mongoose') 
const { connection, Schema} = mongoose
const crypto = require('crypto-js')

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 4, 
        maxlength: 20,
        required: [true, 'username is required'],
        unique: [true, 'username must be unique'],
        validate: function(value){
            return '/[a-zA-Z]+$/'.test(value)
        },
        message: '{value} is not a valid username'
    }, 
    password: String
})

UserSchema.static('login', async function(usr, pwd){
    const hash = crypto.createHash('sha256').update(String(pwd))
    const user = await this.findOne()
                .where('username', usr)
                .where('password', hash.digest('hex'))
    if(!user) throw new Error('Incorrect credentials')
    delete user.password
    return user
})
UserSchema.static('signup', async function(usr, pwd){
    if(pwd.lenghth < 6){
        throw new Error('Password is too short')
    }
    const hash = crypto.createHash('sha256').update(pwd)
    const exist = await this.findOne()
                .where('username', usr)
    if(exist) throw new Error('username already exists')
    const user = await this.create({
        username: usr,
        password: hash.digest('hex'),
    })
    return user
})
UserSchema.method('changePass', async function(pwd){
    if(pwd.lenghth < 6){
        throw new Error('Password is too short')
    }
    const hash = crypto.createHash('sha256').update(pwd)
    this.password = hash.digest('hex')
    return this.save()
})

const User = connection.model('User', UserSchema)

module.exports = User