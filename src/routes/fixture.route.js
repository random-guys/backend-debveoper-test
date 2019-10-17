import { Router } from 'express';
import FixtureController from '../controllers/fixture.controller';
import Auth from '../middlewares/auth';
import ValidatorB from '../middlewares/validation/bodyValidation';
import ValidatorP from '../middlewares/validation/paramValidation';

const router = Router();

router
  .post('/create', [Auth.authenticate, Auth.isAdmin, ValidatorB], FixtureController.create)
  .delete('/:fixture_id', [Auth.authenticate, Auth.isAdmin, ValidatorP], FixtureController.delete)
  .get(
    '/:fixture_id',
    [ValidatorP],
    FixtureController.getOne,
  )
  .get('/', FixtureController.getAll)
  .put('/edit/:fixture_id', [Auth.authenticate, Auth.isAdmin, ValidatorP,
    ValidatorB], FixtureController.edit);

export default router;
