import { createPool } from 'mysql';
const pool = createPool({
    port: process.env.POOL_PORT,
    host: process.env.POOL_HOST,
    user: process.env.POOL_USER,
    password: process.env.POOL_PASSWORD,
    database: process.env.POOL_DATABASE,
    connectionLimit: process.env.POOL_CONNECTION_LIMIT
});

export default pool;