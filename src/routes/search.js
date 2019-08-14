import express from 'express';
import team from '../controllers/Team';
import fixtures from '../controllers/Fixture';
import limiter from '../limiter';


const router = express.Router();
router.get('/view/:name', team.paramChecker, team.viewOne);
router.get('/:status', fixtures.statusChecker, fixtures.filter);

export default router;
