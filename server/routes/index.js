import express from 'express';
import subtractionController from './subtraction.controller';

const router = express.Router();

// API routes for for AJAX calls
router.use('/api/subtract', subtractionController);

// Route for single page react app
router.get('*', (req, res) => {
  res.render('index');
});

export default router;
