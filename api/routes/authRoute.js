import express from 'express';
import authController from '../controllers/authController';
import authValidation from '../validations/authValidations';
import check from '../middlewares/check';

const router = express.Router();
const { userSignup, userSignin } = authController;
const { signupValidation, signinValidation } = authValidation;
const {
  emailExist, emailDontExist, usernameExist, comparePassword
} = check;

router.post(
  '/signup',
  signupValidation,
  usernameExist,
  emailExist,
  userSignup
);

router.post(
  '/signin',
  signinValidation,
  emailDontExist,
  comparePassword,
  userSignin
);

export default router;
