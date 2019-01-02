import express from 'express';

import pollOrchestrator from '../orchestrators/poll.orchestrator';
import answersService from '../services/answers.service';

const router = express.Router();

router.route('/questions')
  .get((req, res) => {
    const result = pollOrchestrator.retrievePollWithoutAnswers();
    res.status(200).json(result);
  });

router.route('/answers')
  .post((req, res) => {
    answersService.saveAnswers(req.body);
    res.status(200).json({});
  });

export default router;