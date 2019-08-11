/* eslint-disable linebreak-style */
import express from 'express';
import teamController from '../controllers/team';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .post(authentication.adminVerifyToken, validations.addOrRemoveTeam, teamController.addTeam)
  .delete(authentication.adminVerifyToken, validations.addOrRemoveTeam, teamController.removeTeam);

export default router;
