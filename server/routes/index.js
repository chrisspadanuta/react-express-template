import express from 'express';

const router = express.Router();

// API routes for for AJAX calls

// Route for single page react app
router.get('*', (req, res) => {
  res.render('index');
});

export default router;