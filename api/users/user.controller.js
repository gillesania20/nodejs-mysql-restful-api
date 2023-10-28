import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './../../constants.js';
import { create } from './user.service.js';

const createUser = (req, res) => {
    const body = req.body;
    const hashedPassword = bcrypt.hashSync(body.password, SALT_ROUNDS);
    create(body, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Database connection error.'
            });
        }else{
            return res.status(200).json({
                success: 1,
                data: results
            });
        }
    });
}

export {
    createUser
}