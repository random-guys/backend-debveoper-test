import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'API is ready',
  });
});

// catch 404 and forward to error handler
router.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Route Not Found',
  });
});

export default router;
