import express from 'express';
import user from '../controllers/User';
import team from '../controllers/Team';

const router = express.Router();
router.post('/', team.addChecker, user.checkToken, team.add);
router.get('/', team.nameChecker, user.checkToken, team.viewOne);
router.get('/all', user.checkToken, team.viewAll);
router.delete('/', team.nameChecker, user.checkToken, team.delete);
// view get
// change patch
// delete
export default router;
