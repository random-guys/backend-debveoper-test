import express from 'express';
import mainRoute from './mainRoute';
import authRoute from './authRoute';
import teamRoute from './teamRoute';

const router = express.Router();

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/team', teamRoute);
router.use(mainRoute);

export default router;
