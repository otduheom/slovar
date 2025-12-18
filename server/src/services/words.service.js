const { Word } = require('../../db/models');

class WordsService {
  static getAll() {
    return Word.findAll();
  }

  static postOne(data) {
    return Word.create(data);
  }
}
module.exports = WordsService;
