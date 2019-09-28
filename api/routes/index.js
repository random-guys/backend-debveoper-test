import express from 'express';
import mainRoute from './mainRoute';
import authRoute from './authRoute';
import teamRoute from './teamRoute';
import fixtureRoute from './fixtureRoute';
import searchRoute from './searchRoute';

const router = express.Router();

router.use('/api/v1/auth', authRoute);
router.use('/api/v1/team', teamRoute);
router.use('/api/v1/fixture', fixtureRoute);
router.use('/api/v1/search', searchRoute);
router.use(mainRoute);

export default router;
