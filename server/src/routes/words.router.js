const LikeController = require('../controllers/LikeController');
const WordsController = require('../controllers/words.controller');
const LikeController = require('../controllers/LikeController');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const wordsRouter = require('express').Router();
const{verifyAccessToken}= require('../middlewares/verifyTokens')

//Основные операции со словами

wordsRouter.get('/', WordsController.getAllWords);
wordsRouter.post('/:wordId/like', verifyAccessToken, LikeController.toggleLike);
wordsRouter.get('/liked', verifyAccessToken, LikeController.getLikedWords);

module.exports = wordsRouter;
