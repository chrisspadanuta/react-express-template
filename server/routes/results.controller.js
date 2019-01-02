import express from 'express';

import answersService from '../services/answers.service';

import log from '../services/logger'

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
    log('all results', results);
    res.status(200).json(results);
  });

export default router;