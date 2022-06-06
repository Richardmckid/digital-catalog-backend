import validator from "validator";
import User from "../models/User.js";

const error500 = (err, req, res, next) => {
    return res.status(500).json({
        success: false,
        message: "Error while registering user",
        error: err
    });
};
const emailValidator = async (req, res, next) => {
    const { email } = req.body;
    if(email == undefined){

        return res.status(400).json({
            success: false,
            message: "Email address is required"
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address"
        });
    }
    if(validator.isEmail(email)){

        try {
            const user = await User.findOne({email});
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Email address already exists"
                });
            }
            return next();
        } catch (error) {
            return error500(error, req, res, next);
        }
         
    }
    return error500(error, req, res, next);
    // next();
}

const usernameValidator = async (req, res, next) => {
    const { username } = req.body;
    if(username == undefined){

        return res.status(400).json({
            success: false,
            message: "Username is required"
        });
    }

    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid username"
        });
    }
    if(validator.isAlphanumeric(username)){
        try {
            const user = await User.findOne({username});
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }
            return next();
            
        } catch (error) {
            return error500(error, req, res, next);
        }     
        
    }

    return error500(error, req, res, next);
    
}
const passwordValidator = async (req, res, next) => {
    const { password } = req.body;
    if(password == undefined){
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }
    if(password.length <= 5){
        return res.status(400).json({
            success: false,
            message: "Password should be at least 6 characters"
        });
    }
    return next()
    
}

const fullnameValidator = async (req, res, next) => {
    const { fullname } = req.body;
    if(fullname == undefined){
        return res.status(400).json({
            success: false,
            message: "Fullname is required"
        });
    }
    if(fullname.length < 5){
        return res.status(400).json({
            success: false,
            message: "Fullname should be at least 5 characters"
        });
    }
    return next()
    
}

// const mobileValidator = async (req, res, next) => {
//     const { mobile } = req.body;
//     !mobile && res.status(400).json({
//         success: false,
//         message: "Please enter a valid mobile number"
//     });
//     if (!validator.isMobilePhone(mobile, "any")) {
//         return res.status(400).json({
//             success: false,
//             message: "Please enter a valid mobile number"
//         });
//     }
//     if(validator.isMobilePhone(mobile, "any")){

//         try {
//         const user = await User.findOne({mobile});
            
//             if (user) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Mobile number already exists"
//                 });
//             }
//             return next();
//         } catch (error) {
//             return error500(error, req, res, next);
//         }
//     }
//     return error500(error, req, res, next);
//     // next();
// }

export { emailValidator, usernameValidator,  passwordValidator, fullnameValidator};
