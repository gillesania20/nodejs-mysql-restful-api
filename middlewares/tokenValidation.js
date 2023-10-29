import jwt from 'jsonwebtoken';
const checkToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    let accessToken = null;
    let decoded = null;
    if(bearerToken){
        accessToken = bearerToken.split(' ')[1];
        decoded = jwt.verify(accessToken, process.env.SECRET_KEY);// will error out if accessToken is invalid
        next();
    }else{
        res.status(403).json({
            success: 0,
            message: 'Access denied.'
        });
    }
}
export {
    checkToken
}