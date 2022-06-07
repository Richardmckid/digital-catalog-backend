import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    fullname: { type: String},
    username: { type: String, required: [true, 'Username is required'], unique: true},
    email: { type: String, required: [true, 'Email address is required'], unique: true},
    password: { type: String, required: [true, 'Password is required']},
    resetLink: { type: String},
    roles: {type: String, default: 'supplier'}
}, {timestamps:true})

UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    return next()
})

const User = mongoose.model('User', UserSchema)
export default User