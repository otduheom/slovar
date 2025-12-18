const { Word, Like } = require('../../db/models');


class WordsService {
  static getAll() {
    return Word.findAll();
  }

  static async deleteWord(wordId) {
    // Сначала удаляем все лайки, связанные со словом
    await Like.destroy({
      where: { wordId },
    });
    
    // Затем удаляем само слово
    await Word.destroy({
      where: { id: wordId },
    });
    
    return true;
  }
}
module.exports = WordsService;
