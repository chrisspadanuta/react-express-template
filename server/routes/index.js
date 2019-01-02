import express from 'express';
import adminController from './admin.controller';
import pollController from './poll.controller';
import resultsController from './results.controller'

const router = express.Router();

/* GET home page. */
// router.get('/api/*', (req, res) => {
//   res.end('hello api route');
// });

router.use('/api/admin', adminController);
router.use('/api/poll', pollController);
router.use('/api/results', resultsController);

router.get('*', (req, res) => {
  res.render('index');
});

export default router;