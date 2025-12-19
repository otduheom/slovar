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

  static async getUnpublishedWords(req, res) {
    try {
      const words = await WordsService.getUnpublishedWords();
      res.status(200).json(words);
    } catch (error) {
      console.error('Error getting unpublished words:', error);
      res.status(500).json({ message: 'Ошибка при получении слов на модерацию' });
    }
  }

  static async updatePublicStatus(req, res) {
    try {
      const { wordId } = req.params;
      const { public: publicStatus } = req.body;
      const word = await WordsService.updatePublicStatus(wordId, publicStatus);
      res.status(200).json(word);
    } catch (error) {
      console.error('Error updating public status:', error);
      res.status(500).json({ message: 'Ошибка при обновлении статуса слова' });
    }
  }
}

module.exports = WordsController;
