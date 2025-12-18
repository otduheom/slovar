const WordsService = require('../services/words.service');

class WordsController {
  static async getAllWords(req, res) {
    const words = await WordsService.getAll();
    res.status(200).json(words);
  }

  static async deleteWord(req, res) {
    try {
      const { wordId } = req.params;
      await WordsService.deleteWord(wordId);
      return res.status(200).json({ message: 'Слово успешно удалено' });
    } catch (error) {
      console.error('Error deleting word:', error);
      return res.status(500).json({ message: 'Ошибка при удалении слова' });
    }
  }
  
    static async postOneWord(req, res) {
    const data = req.body;
    const word = await WordsService.postOne(data);
    console.log(word);
    res.status(201).json(word);
  }
}

module.exports = WordsController;
