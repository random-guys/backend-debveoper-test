/* eslint-disable linebreak-style */
import express from 'express';
import fixtureController from '../controllers/fixture';
import validations from '../middleware/validations';
import authentication from '../middleware/authentication';

const router = express.Router();

router.route('/')
  .post(authentication.adminVerifyToken, validations.addFixture, fixtureController.addFixture)
  .get(authentication.adminVerifyToken, fixtureController.getAllFixtures);

router.route('/:fixtureId')
  .delete(
    authentication.adminVerifyToken, validations.removeFixture, fixtureController.removeFixture,
  )
  .get(authentication.adminVerifyToken, validations.getFixture, fixtureController.getFixture);

router.patch('/:fixtureId/dateTime', authentication.adminVerifyToken, validations.editFixture, fixtureController.editFixture);
router.patch('/:fixtureId/status', authentication.adminVerifyToken, validations.editFixture, fixtureController.editFixture);
router.patch('/:fixtureId/score', authentication.adminVerifyToken, validations.editFixture, fixtureController.editFixture);

export default router;
