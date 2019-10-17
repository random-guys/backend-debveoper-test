import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Auth from '../middlewares/auth';
import ValidatorB from '../middlewares/validation/bodyValidation';

const router = Router();

router
  .post('/admin/signup', [Auth.authenticate, Auth.isAdmin, ValidatorB], UserController.create)
  .post('/regular/signup', [ValidatorB], UserController.create)
  .post('/signin', [ValidatorB], UserController.login);

export default router;
