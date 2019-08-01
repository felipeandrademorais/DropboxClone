const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

User.pre('save', async function (next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 8)
})

User.methods = { 
    compareHash (password) {
        return bcrypt.compare(password, this.password);
    }
 }

 User.statics = {
     generateToken ({ id }) {
         return jwt.sign({ id }, authConfig.secret, { 
             expiresIn: 86400
         });
     }
 }

module.exports = mongoose.model("User", User);