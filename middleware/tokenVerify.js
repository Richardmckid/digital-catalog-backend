import jwt from 'jsonwebtoken';


const tokenVerify = async (req, res, next) => {
    
    const cookie = req.cookies['token'];
    // console.log(cookie);
    jwt.verify(cookie, process.env.JWT_SECRET, async (err, user) => {
        if(err){
            return res.status(401).json({
                success: false,
                message: 'Your session has expired, please login again',
                err
            });
        }

        req.user = await user;
        // req.user.roles = await
        next();
    });
}



export {tokenVerify};