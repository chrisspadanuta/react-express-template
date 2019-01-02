import express from 'express';

import resultsOrchestrator from '../orchestrators/results.orchestrator';
import answersService from '../services/answers.service';

const router = express.Router();

router.route('/results/:id')
  .get((req, res) => {
    const id = Number.parseInt(req.params.id);
    const result = resultsOrchestrator.retrievePoll(id);
    res.status(200).json(result);
  });

router.route('/results')
  .get((req, res) => {
    const results = answersService.retrievePoll(id);
    res.status(200).json(results);
  });

export default router;