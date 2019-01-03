import express from 'express';

import answersService from '../services/answers.service';

const router = express.Router();

router.route('/result/:id')
  .get((req, res) => {
    const id = Number.parseInt(req.params.id);
    const result = answersService.retrievePoll(id);
    res.status(200).json(result);
  });

router.route('/all')
  .get((req, res) => {
    const results = answersService.retrieveAll();
    res.status(200).json(results);
  });

export default router;