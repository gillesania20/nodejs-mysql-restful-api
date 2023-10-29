import express from 'express';
import { createUserController, getUserByUserIdController, getUsersController, updateUserController, deleteUserController,
    loginController
} from './user.controller.js';
import { checkToken } from './../../middlewares/tokenValidation.js';
const router = express.Router();
router.post('/login', loginController);
router.post('/', checkToken, createUserController);
router.get('/', checkToken, getUsersController);
router.get('/:id', checkToken, getUserByUserIdController);
router.patch('/', checkToken, updateUserController);
router.delete('/', checkToken, deleteUserController);
export default router;