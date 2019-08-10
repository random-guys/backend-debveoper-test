import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.post('/signup/user', authController.signUp);

export default router;