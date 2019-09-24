import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', UserController.userSignup);
router.post('/auth/login', UserController.userLogin);

export default router;
