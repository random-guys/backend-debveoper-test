import express from 'express';
import userRoute from './userRoute';
import teamRoute from './teamRoute';

const router = express.Router();

router.use('/user', userRoute);
router.use('/team', teamRoute);

export default router;
