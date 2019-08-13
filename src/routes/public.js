/* eslint-disable linebreak-style */
import express from 'express';
import fixtureController from '../controllers/fixture';
import teamController from '../controllers/team';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();
// team?min_players&max_players
router.get('/team', authentication.verifyToken, validations.publicTeamSearch, teamController.publicTeamSearch);
router.get('/team/:teamName', authentication.verifyToken, validations.findTeam, teamController.findTeam);
// fixture?from=YYYY-MM-DD+00:00&to=YYYY-MM-DD+00:00
router.get('/fixture', authentication.verifyToken, validations.publicFixtureSearch, fixtureController.publicFixtureSearch);
router.get('/fixture/completed', authentication.verifyToken, fixtureController.getCompletedOrPendingFixtures);
router.get('/fixture/pending', authentication.verifyToken, fixtureController.getCompletedOrPendingFixtures);

export default router;
