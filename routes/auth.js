import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailValidator, usernameValidator, passwordValidator} from "../middleware/userModelValidator.js";
import { tokenVerify } from "../middleware/tokenVerify.js";

const authRouter = Router();

authRouter.post('/login', async(req, res) =>{
    
    // const { email, password } = req.body;
    let pass1 = req.body.password
    let username = req.body.username

    var pass = atob(pass1);
    console.log(req.body);
    if(!username || !pass){
        return res.status(400).json({
            success: false,
            message: 'Email and Password are required'
        })
    }
    // const pass = password
    try {


        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Incorrect login credentials'
            })
        }
        const checkPassword =  await bcrypt.compare(pass, user.password);
        // console.log(req.body)
        

        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: 'Incorrect login credentials'
            })
        }

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
        const {password, ...currentUser} = user._doc

        res.cookie(
            'token', token, {
                secure: 'development',
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            }
        )
        res.status(200).json({
            success: true,
            currentUser,
            token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occured, please try again later.',
            error
        })
    }
})
authRouter.post('/register', emailValidator, usernameValidator, passwordValidator, async(req, res) =>{
    
    const { username, email, password, passwordConfirm } = req.body;
    const newUser = new User({
        email,
        username,
        password
    })

    if(password !== passwordConfirm){
        return res.status(400).json({
            success: false,
            message: 'Password and Confirm Password do not match'
        })
    }

    try {
        
        const user = await newUser.save()
        if(user){
            return res.status(201).json({
                success: true,
                message: 'Account created successfully'
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'An error occured, please try again later.',
            error
        })
    }
})

authRouter.get('/profile/:id', tokenVerify, async(req, res) =>{

    const uid = req.params.id;

    if(mongoose.Types.ObjectId.isValid(uid)){

        const user = await User.findById(uid);
        
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'There is no user matching the provided ID: '+uid
            })
        }

        if(user._id !== uid){
            return res.status(401).json({
                success: false,
                message: 'Not allowed to view this profile'
            })
        }


        const {password, ...profile} = user._doc

        return res.status(200).json({
            success: true,
            profile,
        })
    }

    return res.status(401).json({
        success: false,
        message: 'There is no user matching the provided'
    })
})

authRouter.get('/logout', async(req, res) =>{
    
    return res.clearCookie('token');
})



export default authRouter