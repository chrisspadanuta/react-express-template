import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/api/*', (req, res) => {
  res.end('hello api route');
});

router.get('*', (req, res) => {
  res.render('index');
});

export default router;