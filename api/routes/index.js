import express from 'express';
import mainRoute from './mainRoute';
import authRoute from './authRoute';

const router = express.Router();

router.use('/api/v1/auth', authRoute);
router.use(mainRoute);

export default router;
