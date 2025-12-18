const WordsController = require('../controllers/words.controller');
const wordsRouter = require('express').Router();

//Основные операции со словами

wordsRouter.get('/', WordsController.getAllWords);

module.exports = wordsRouter;
