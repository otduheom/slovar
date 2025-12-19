const aiService = require('../services/ai.service');

class AiController {
  static async askAi(req, res) {
    const { wordName } = req.body;

    const answer = await aiService.example(wordName);

    res.json({ answer });
  }
}

module.exports = AiController;
