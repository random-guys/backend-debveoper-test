import express from 'express';
import authController from '../controllers/authController';
import authValidation from '../validations/authValidations';
import check from '../middlewares/check';
import jwt from '../middlewares/jwt';
import checkRole from '../middlewares/roles';

const router = express.Router();
const {
  userSignup, userSignin, adminSignin, adminSignup
} = authController;
const {
  signupValidation, signinValidation, adminSignupValidation
} = authValidation;
const {
  emailExist, emailDontExist, usernameExist,
  comparePassword, checkIfAdmin
} = check;
const {
  checkToken, verifyToken
} = jwt;

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

router.post(
  '/admin/signup',
  checkToken,
  verifyToken,
  checkRole,
  adminSignupValidation,
  usernameExist,
  emailExist,
  adminSignup
);

router.post(
  '/admin/signin',
  signinValidation,
  emailDontExist,
  checkIfAdmin,
  comparePassword,
  adminSignin
);

export default router;
