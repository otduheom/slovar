const express = require('express');
const authRouter = require('./authRouter');
const wordsRouter = require('./words.router');
const apiRouter = express.Router();
const { verifyAccessToken } = require('../middlewares/verifyTokens');

apiRouter.use('/auth', authRouter);
apiRouter.use('/words', wordsRouter);
apiRouter.get('/test', verifyAccessToken, (req, res) => {
  // Если мидлварка verifyAccessToken прошла успешно,
  // выполнение доходит до этой функции, и токен считается валидным.

  // Мы можем получить данные пользователя из res.locals, куда их записала мидлварка
  const user = res.locals.user;
  console.log('Декодированные данные пользователя из токена:', user);
  res.status(200).json({
    message: 'Access granted! Token is valid.',
    userDataFromToken: user,
  });
});

module.exports = apiRouter;
