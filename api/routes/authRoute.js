import express from 'express';
import authController from '../controllers/authController';
import authValidation from '../validations/authValidations';
import check from '../middlewares/check';

const router = express.Router();
const { userSignup } = authController;
const { signupValidation } = authValidation;
const { emailExist, usernameExist } = check;

router.post(
  '/signup',
  signupValidation,
  usernameExist,
  emailExist,
  userSignup
);

export default router;
