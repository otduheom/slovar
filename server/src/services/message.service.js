const { Message, User } = require('../../db/models')

class MessageService {
  static getMessages() {
    return Message.findAll();
  }

  static getMessage(id) {
    return Message.findByPk(id, { include: { model: User, attributes: ['id', 'name'] } });
  }

  static createMessage(message) {
    return Message.create(message);
  }

  static async updateMessage(id, message) {
    await Message.update(message, {
      where: {
        id
      }
    });

    return Message.findByPk(id);
  }

  static deleteMessage(id) {
    return Message.destroy({
      where: {
        id
      }
    });

  }
}

module.exports = MessageService;