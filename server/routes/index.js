import express from 'express';
import userRoute from './userRoute';

const router = express.Router();

router.use('/user', userRoute);

export default router;
