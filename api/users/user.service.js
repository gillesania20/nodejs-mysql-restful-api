import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './../../constants.js';
import pool from './../../config/database.js';

const create = (data, callback) => {
    const hashedPassword = bcrypt.hashSync(data.password, SALT_ROUNDS);
    pool.query(
        `INSERT INTO registration(firstName, lastName, gender, email, password, number) VALUES(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            hashedPassword,
            data.number
        ],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }else{
                return callback(null, results);
            }
        }
    );
}
const getUsers = (callback) => {
    pool.query(
        'SELECT id, firstName, lastName, gender, email, number FROM registration',
        [],
        (error, results, fields) => {
            if(error) {
                return callback(error);
            }else{
                return callback(null, results);
            }
        }
    );
}
const getUserByUserId = (id, callback) => {
    pool.query(
        'SELECT id, firstName, lastName, gender, email, number FROM registration WHERE id = ?',
        [id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }else{
                return callback(null, results[0]);
            }
        }
    );
}
const updateUser = (data, callback) => {
    const hashedPassword = bcrypt.hashSync(data.password, SALT_ROUNDS);
    pool.query(
        'UPDATE registration SET firstName = ?, lastName = ?, gender = ?, email = ?, password = ?, number = ? WHERE id = ?',
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            hashedPassword,
            data.number,
            data.id
        ],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }else{
                return callback(null, results[0]);
            }
        }
    );
}
const deleteUser = (data, callback) => {
    pool.query(
        'DELETE FROM registration WHERE id = ?',
        [data.id],
        (error, results, fields) => {
            if(error){
                return callback(error);
            }else{
                return callback(null, results[0]);
            }
        }
    );
}
const getUserByUserEmail = (email, callback) => {
    pool.query(
        'SELECT * FROM registration WHERE email = ?',
        [email],
        (error, results, fields) => {
            if(error){
                return callback(err);
            }else{
                return callback(null, results[0]);
            }
        }
    );
}

export {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    getUserByUserEmail
}