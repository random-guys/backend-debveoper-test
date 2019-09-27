import express from 'express';
import fixtureController from '../controllers/fixtureController';
import fixturesValidation from '../validations/fixturesValidation';
import checkIfExist from '../middlewares/check';
import jwt from '../middlewares/jwt';
import checkRole from '../middlewares/roles';

const router = express.Router();

const {
  createFixtureValidation, editFixtureValidation
} = fixturesValidation;
const {
  addFixture, editFixture, removeFixture, viewFixture,
  viewAllFixtures, viewCompletedFixtures, viewPendingFixtures,
  fixtureLink
} = fixtureController;
const {
  checkToken, verifyToken
} = jwt;
const {
  teamNameDontExist, fixtureValid,
  fixtureGeneratedLinkValid
} = checkIfExist;

router.post(
  '/create',
  checkToken,
  verifyToken,
  checkRole,
  createFixtureValidation,
  teamNameDontExist,
  addFixture
);

router.patch(
  '/edit/:fixtureId',
  checkToken,
  verifyToken,
  checkRole,
  fixtureValid,
  editFixtureValidation,
  teamNameDontExist,
  editFixture
);

router.delete(
  '/remove/:fixtureId',
  checkToken,
  verifyToken,
  checkRole,
  fixtureValid,
  removeFixture
);

router.get(
  '/',
  checkToken,
  verifyToken,
  viewAllFixtures
);

router.get(
  '/:fixtureId',
  checkToken,
  verifyToken,
  fixtureValid,
  viewFixture
);

router.get(
  '/match/completed',
  checkToken,
  verifyToken,
  viewCompletedFixtures
);

router.get(
  '/match/pending',
  checkToken,
  verifyToken,
  viewPendingFixtures
);

router.get(
  '/match/:fixtureLink',
  checkToken,
  verifyToken,
  fixtureGeneratedLinkValid,
  fixtureLink
);

export default router;
