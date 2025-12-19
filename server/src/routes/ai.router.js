const AiController = require('../controllers/ai.controller');

const aiRouter = require('express').Router();

aiRouter.post('/completion', AiController.askAi);

module.exports = aiRouter;
