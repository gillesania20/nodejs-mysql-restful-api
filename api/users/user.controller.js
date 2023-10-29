import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail } from './user.service.js';

const createUserController = (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Database connection error.',
                data: null
            });
        }else{
            return res.status(200).json({
                success: 1,
                message: 'User created.',
                data: results
            });
        }
    });
}
const getUserByUserIdController = (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Something went wrong.',
                data: null
            });
        }else if(!results) {
            return res.status(404).json({
                success: 0,
                message: 'Record not found.',
                data: null
            });
        }else{
            return res.status(200).json({
                success: 1,
                message: 'Record found.',
                data: results
            });
        }
    });
}
const getUsersController = (req, res) => {
    getUsers((err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Something went wrong.',
                data: null
            });
        }else{
            return res.status(200).json({
                success: 1,
                message: 'Records found.',
                data: results
            });
        }
    });
}
const updateUserController = (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Something went wrong'
            });
        }else if(!results){
            return res.status(400).json({
                success: 0,
                message: 'Failed to update user.'
            });
        }else{
            return res.status(200).json({
                success: 1,
                message: 'User data updated.'
            });
        }
    });
}
const deleteUserController = (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
        if(err){
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: 'Something went wrong'
            });
        }else if(!results) {
            return res.status(404).json({
                success: 0,
                message: 'Record not found.'
            });
        }else {
            return res.status(200).json({
                success: 1,
                message: 'User deleted.'
            });
        }
    });
}
const loginController = (req, res) => {
    const body = req.body;
    let comparePassword = null;
    let token = null;
    getUserByUserEmail(body.email, (err, results) => {
        if(err){
            console.log(err)
            return res.status(500).json({
                success: 0,
                message: 'Something went wrong.',
                token: null
            });
        }else if(!results){
            return res.status(400).json({
                success: 0,
                message: 'Invalid email or password',
                token: null
            });
        }else{
            comparePassword = compareSync(body.password, results.password);
            if(comparePassword){
                results.password = undefined;
                token = jwt.sign({result: results}, process.env.SECRET_KEY, {expiresIn: '1h'});
                return res.status(200).json({
                    success: 1,
                    message: 'login successfully',
                    token
                });
            }else{
                return res.status(400).json({
                    success: 0,
                    message: 'invalid email or password',
                    token: null
                });
            }
        }
    });
}

export {
    createUserController,
    getUserByUserIdController,
    getUsersController,
    updateUserController,
    deleteUserController,
    loginController
}