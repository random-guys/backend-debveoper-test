import express from 'express';
import user from '../controllers/User';


const router = express.Router();
router.post('/signup', user.signupCheck, user.signup);
router.post('/signin', user.signin);
export default router;
