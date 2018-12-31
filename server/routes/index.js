import express from 'express';
import adminController from './admin.controller';

const router = express.Router();

/* GET home page. */
// router.get('/api/*', (req, res) => {
//   res.end('hello api route');
// });

router.use('/api/admin', adminController);

router.get('*', (req, res) => {
  res.render('index');
});

export default router;