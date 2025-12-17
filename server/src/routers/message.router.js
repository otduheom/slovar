const MessageController = require("../controllers/message.controller");
const { verifyRefreshToken, verifyAccessToken } = require("../middlewares/verifyTokens");
const MessageService = require("../services/message.service");

const messageRouter = require("express").Router();

// messageRouter.get('/', MessageController.getMessages);
// messageRouter.get('/:id', MessageController.getMessage);
// messageRouter.post('/', MessageController.createMessage);
// messageRouter.put('/:id', MessageController.updateMessage);
// messageRouter.delete('/:id', MessageController.deleteMessage);

messageRouter.route('/')
  .get(MessageController.getMessages)
  .post(verifyAccessToken, MessageController.createMessage)
messageRouter
  .route('/:id')
  .get(MessageController.getMessage)
  .put(verifyAccessToken, MessageController.updateMessage)
  .delete(verifyAccessToken, MessageController.deleteMessage);
messageRouter.route('/my').get(verifyAccessToken, (req, res) => {
  const { user } = res.locals;
  res.json(MessageService.getByUserId(user.id))
})
module.exports = messageRouter;