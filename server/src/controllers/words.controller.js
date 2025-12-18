const WordsService = require('../services/words.service');

class WordsController {
  static async getAllWords(req, res) {
    const words = await WordsService.getAll();
    res.status(200).json(words);
  }
}
module.exports = WordsController;
