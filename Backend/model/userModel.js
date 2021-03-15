const mongo = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongo.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(givenpassword) {
    return await bcrypt.compare(givenpassword, this.password)
}

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongo.model('User', userSchema)
module.exports = User
