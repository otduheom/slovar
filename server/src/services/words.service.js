const { Word } = require('../../db/models');


class WordsService {
  static getAll() {
    return Word.findAll();
  }
}
module.exports = WordsService;
