import express from 'express';

const router = express.Router();

router.route('/poll/:id')
  .get((req, res) => {
    res.status(200).json({ result: `get ${req.params.id}` });
  }).post((req, res) => {
    res.status(200).json({ result: `post ${req.params.id}` });
  });

export default router;