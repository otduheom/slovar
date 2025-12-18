const LikeController = require('../controllers/LikeController');
const WordsController = require('../controllers/words.controller');
const wordsRouter = require('express').Router();
const{verifyAccessToken}= require('../middlewares/verifyTokens')

//Основные операции со словами

wordsRouter.get('/', WordsController.getAllWords);
wordsRouter.post('/:wordId/like',verifyAccessToken,LikeController.toggleLike)
wordsRouter.post('/liked',verifyAccessToken,LikeController.getLikedWords)

module.exports = wordsRouter;
