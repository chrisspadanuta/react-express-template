import express from 'express';

import subtract from '../orchestrators/subtraction.orchestrator';

const router = express.Router();

router.route('/').post((req, res) => {
  const { a, b } = req.body;
  const result = { result: subtract(a, b) };
  res.status(200).json(result);
});

export default router;
