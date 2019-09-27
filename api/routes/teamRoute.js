import express from 'express';
import teamController from '../controllers/teamController';
import teamValidation from '../validations/teamValidations';
import checkIfExist from '../middlewares/check';
import jwt from '../middlewares/jwt';
import checkRole from '../middlewares/roles';

const router = express.Router();

const {
  createTeamValidation, editTeamValidation
} = teamValidation;
const {
  addTeam, editTeam, removeTeam, viewAllTeam, viewTeam
} = teamController;
const {
  checkToken, verifyToken
} = jwt;
const {
  teamNameExist, teamShortNameExist, teamValid
} = checkIfExist;

router.post(
  '/create',
  checkToken,
  verifyToken,
  checkRole,
  createTeamValidation,
  teamShortNameExist,
  teamNameExist,
  addTeam
);

router.patch(
  '/edit/:shortName',
  checkToken,
  verifyToken,
  checkRole,
  teamValid,
  editTeamValidation,
  teamShortNameExist,
  teamNameExist,
  editTeam
);

router.delete(
  '/remove/:shortName',
  checkToken,
  verifyToken,
  checkRole,
  teamValid,
  removeTeam
);

router.get(
  '/',
  checkToken,
  verifyToken,
  viewAllTeam
);

router.get(
  '/:shortName',
  checkToken,
  verifyToken,
  teamValid,
  viewTeam
);

export default router;
