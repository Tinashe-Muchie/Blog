const mongoose = require('mongoose') 
const { connection, Schema} = mongoose
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 4, 
        maxlength: 20,
        required: [true, 'username is required'],
        unique: [true, 'username must be unique'],
        validate: function(value){
            return /[a-zA-Z]+$/.test(value)
        },
        message: '{value} is not a valid username'
    }, 
    password: {
        type: String,
        required: [true, 'password is required']
    }
})

UserSchema.static('signup', async function(usr, pwd){
        if(pwd.length < 6) throw new Error('Password is too short, 6 characters minimum')
        const exist = await this.findOne()
                    .where('username', usr)
        if(exist) throw new Error('username already exists') 
        const hash = bcrypt.hashSync(pwd, 10)
        const user = await this.create({
            username: usr,
            password: hash,
        })
    return user
})

UserSchema.static('login', async function(usr, pwd){
        const user = await this.findOne()
                    .where('username', usr)
        if(!user){
            throw new Error ('Incorrect username')
        }    
        if (!bcrypt.compareSync(pwd, user.password)){
            throw new Error('Invalid password')
        } 
        return user
    }
)

const User = connection.model('User', UserSchema)

module.exports = User