/* eslint-disable linebreak-style */
import express from 'express';
import authController from '../controllers/auth';
import validations from '../validations';

const router = express.Router();

router.post('/signup/user', validations.signUpValidation, authController.signUp);

export default router;