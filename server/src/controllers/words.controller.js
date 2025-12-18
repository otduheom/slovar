const WordsService = require('../services/words.service');

class WordsController {
  static async getAllWords(req, res) {
    const words = await WordsService.getAll();
    res.status(200).json(words);
  }

  static async postOneWord(req, res) {
    const data = req.body;
    const word = await WordsService.postOne(data);
    console.log(word);
    res.status(201).json(word);
  }
}
module.exports = WordsController;
