const MessageService = require('../services/message.service');

class MessageController {
  static async getMessages(req, res) {
    try {
      const messages = await MessageService.getMessages();
      res.json(messages);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getMessage(req, res) {
    try {
      const message = await MessageService.getMessage(req.params.id);
      if (!message) {
        return res.status(404).json({
          error: 'Message not found',
        });
      }
      res.json(message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async createMessage(req, res) {
    const { user } = res.locals;

    try {
      const message = await MessageService.createMessage({
        ...req.body,
        userId: user.id,
      });
      res.status(201).json(message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async updateMessage(req, res) {
    try {

      const { user } = res.locals;

      const originalMessage = await MessageService.getMessage(req.params.id);
      if (!originalMessage) {
        return res.status(404).json({ error: "Сообщение не найдено" })
      }

      if (user.id !== originalMessage.userId) {
        return res.status(403).json({ error: "Нельзя удалить чужое сообщение" })
      }

      const message = await MessageService.updateMessage(req.params.id, req.body);
      res.json(message);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async deleteMessage(req, res) {
    const { user } = res.locals;

    const message = await MessageService.getMessage(req.params.id);

    if (!message) {
      return res.status(404).json({ error: "Сообщение не найденоs" })
    }

    if (user.id !== message.userId) {
      return res.status(403).json({ error: "Нельзя удалить чужое сообщение" })
    }

    try {
      await MessageService.deleteMessage(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }
}

module.exports = MessageController;
