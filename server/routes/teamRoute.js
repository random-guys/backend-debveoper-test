import express from 'express';
import TeamController from '../controllers/teamController';
import Validate from '../middlewares/Validate';

const router = express.Router();

router.post('/add', Validate.admin, TeamController.addTeam);

export default router;
