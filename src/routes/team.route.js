import { Router } from 'express';
import TeamController from '../controllers/team.controller';
import Auth from '../middlewares/auth';
import ValidatorB from '../middlewares/validation/bodyValidation';
import ValidatorP from '../middlewares/validation/paramValidation';

const router = Router();

router
  .post('/add', [Auth.authenticate, Auth.isAdmin, ValidatorB], TeamController.create)
  .delete(
    '/:team_id',
    [Auth.authenticate, Auth.isAdmin, ValidatorP],
    TeamController.delete,
  )
  .get(
    '/:team_id',
    [ValidatorP],
    TeamController.getOne,
  )
  .get('/', TeamController.getAll)
  .put('/edit/:team_id', [Auth.authenticate, Auth.isAdmin, ValidatorP, ValidatorB],
    TeamController.edit);

export default router;
