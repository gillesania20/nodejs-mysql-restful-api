import pool from './../../config/database.js';

const create = (data, callback) => {
    pool.query(
        `insert into registration(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`,
        [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
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

export {
    create
}