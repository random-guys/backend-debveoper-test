import express from 'express';
import user from '../controllers/User';
import team from '../controllers/Team';

const router = express.Router();
router.post('/', team.addChecker, user.checkToken, team.add);
router.get('/view/:name', team.paramChecker, user.checkToken, team.viewOne);
router.get('/all', user.checkToken, team.viewAll);
router.delete('/', team.deleteChecker, user.checkToken, team.delete);
router.patch('/:name', team.paramChecker, team.nameChecker, user.checkToken, team.changeName);
// view get
// change patch
// delete
export default router;
