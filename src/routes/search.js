import express from 'express';
import user from '../controllers/User';
import team from '../controllers/Team';
import fixtures from '../controllers/Fixture';


const router = express.Router();
router.get('/view/:name', team.paramChecker, team.viewOne);
router.get('/:status', fixtures.statusChecker, fixtures.filter);

export default router;
