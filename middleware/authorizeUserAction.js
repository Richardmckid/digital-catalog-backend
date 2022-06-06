import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Supplier from '../models/Supplier.js';

const authorizeUserAction = async (req, res, next) => {
    
    // const cookie = req.cookies['access-token'];
    // // console.log(cookie);
    // jwt.verify(cookie, process.env.JWT_SECRET, async (err, user) => {
    //     if(err){
    //         return res.status(401).json({
    //             success: false,
    //             message: 'Your session has expired, please login again',
    //             err
    //         });
    //     }

    //     req.user = await user;
    //     next();
    // });

    const sid = req.params.id;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const supplier = await Supplier.findById(sid);

    if(!user){
        return res.status(401).json({
                success: false,
                message: 'You are not authorized to view or perform this action, please login or contact your administrator 1',
            
            });
    }
    if(!supplier){
        return res.status(401).json({
                success: false,
                message: 'Supplier with the provided ID: '+sid+' was not found',
            
            });
    }

    if(supplier.author == userId){
        console.log('Author.....')
        return next();
    }


    const role = user.roles.find( r => r == 'admin');
    console.log(role);

    if(role){
        console.log('Admin.....')
        return next();
    }


    return res.status(401).json({
        success: false,
        message: 'You are not authorized to view or perform this action, please login or contact your administrator 2',
    
    });
}



export {authorizeUserAction};