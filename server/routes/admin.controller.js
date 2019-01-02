import express from 'express';

import questionsService from '../services/questions.service'
import answersService from '../services/answers.service'

const router = express.Router();

router.route('/poll')
  .get((req, res) => {
    const poll = questionsService.retrievePoll();
    res.status(200).json(poll);
  }).post((req, res) => {
    questionsService.savePoll(req.body);
    res.status(200).json({});
  });

router.route('/submissions')
  .get((req, res) => {
    const result = answersService.retrieveAll();
    res.status(200).json(result);
  });

export default router;