import express from 'express';
import adminController from './admin.controller';
import pollController from './poll.controller';
import resultsController from './results.controller'

const router = express.Router();

// API routes for for AJAX calls
router.use('/api/admin', adminController);
router.use('/api/poll', pollController);
router.use('/api/results', resultsController);

// Route for single page react app
router.get('*', (req, res) => {
  res.render('index');
});

export default router;