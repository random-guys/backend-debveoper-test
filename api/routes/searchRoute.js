import express from 'express';
import searchController from '../controllers/searchController';

const router = express.Router();

const { search } = searchController;

router.post(
  '/:searchValue',
  search
);

export default router;
