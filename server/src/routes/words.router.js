const LikeController = require('../controllers/LikeController');
const WordsController = require('../controllers/words.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const wordsRouter = require('express').Router();

// Middleware для проверки прав администратора
const verifyAdmin = (req, res, next) => {
  const user = res.locals.user;
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора.' });
  }
  next();
};

wordsRouter.get('/', WordsController.getAllWords);
wordsRouter.post('/', WordsController.postOneWord);
wordsRouter.post('/:wordId/like', verifyAccessToken, LikeController.toggleLike);
wordsRouter.get('/liked', verifyAccessToken, LikeController.getLikedWords);
wordsRouter.get('/moderation', verifyAccessToken, verifyAdmin, WordsController.getUnpublishedWords);
wordsRouter.patch('/:wordId/public', verifyAccessToken, verifyAdmin, WordsController.updatePublicStatus);
wordsRouter.delete('/:wordId', verifyAccessToken, verifyAdmin, WordsController.deleteWord);

module.exports = wordsRouter;
