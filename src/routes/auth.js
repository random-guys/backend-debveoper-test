/* eslint-disable linebreak-style */
import express from 'express';
import authController from '../controllers/auth';
import validations from '../middleware/validations';

const router = express.Router();

router.post('/signup/user', validations.signUpValidation, authController.signUp);
router.post('/signup/admin', validations.signUpValidation, authController.signUp);
router.post('/signin', validations.signInValidation, authController.signIn);

export default router;
