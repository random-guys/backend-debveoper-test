/* eslint-disable linebreak-style */
import express from 'express';
import teamController from '../controllers/team';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .post(authentication.adminVerifyToken, validations.addTeam, teamController.addTeam)
  .delete(authentication.adminVerifyToken, validations.removeTeam, teamController.removeTeam);

router.patch('/:teamName/players', authentication.adminVerifyToken, validations.updatePlayers, teamController.updatePlayers);

export default router;
