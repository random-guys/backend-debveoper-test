import express from 'express';
import team from '../controllers/Team';
import fixtures from '../controllers/Fixture';
import limiter from '../limiter';


const router = express.Router();
router.get('/view/:name', team.paramChecker, limiter, team.viewOne);
router.get('/:status', fixtures.statusChecker, limiter, fixtures.filter);

export default router;
