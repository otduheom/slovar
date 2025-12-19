const { Word, Like } = require('../../db/models');

class WordsService {
  static getAll() {
    return Word.findAll({
      where: {
        public: true,
      },
    });
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

  static postOne(data) {
    return Word.create(data);
  }

  static getUnpublishedWords() {
    return Word.findAll({
      where: {
        public: false,
      },
      order: [['createdAt', 'DESC']],
    });
  }

  static async updatePublicStatus(wordId, publicStatus) {
    await Word.update({ public: publicStatus }, { where: { id: wordId } });
    return Word.findByPk(wordId);
  }
}
module.exports = WordsService;
