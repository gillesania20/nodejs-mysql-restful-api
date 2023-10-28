import 'dotenv/config';
import express from 'express';
import userRouter from './api/users/user.router.js';
const app = express();
const PORT = process.env.PORT || 3500;
app.use(express.json());
app.use('/api/users', userRouter);
app.listen(PORT, ()=>{
    console.log(`Listening to port: ${PORT}`);
});