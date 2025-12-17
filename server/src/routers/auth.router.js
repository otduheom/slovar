const AuthController = require('../controllers/auth.controller');

const authRouter = require('express').Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/signin', AuthController.signin);
authRouter.get('/refresh', AuthController.refresh);
authRouter.delete('/signout', AuthController.signout);

module.exports = authRouter;
 