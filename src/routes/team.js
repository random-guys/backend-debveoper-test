/* eslint-disable linebreak-style */
import express from 'express';
import teamController from '../controllers/team';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();

router.post('/', authentication.adminVerifyToken, validations.addTeam, teamController.addTeam);

export default router;
