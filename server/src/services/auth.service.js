const { User } = require('../../db/models/');
const bcrypt = require('bcrypt');

class AuthService {
  static async signup({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Все поля должны быть заполнены');
    }

    const hashpass = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        hashpass,
      },
    });

    if (!created) {
      throw new Error('Email уже занят');
    }

    const plainUser = user.get();
    
    delete plainUser.hashpass;

    return plainUser;
  }

  static async signin({ password, email }) {
    if (!password || !email) {
      throw new Error('Все поля должны быть заполнены');
    }
    const user = await User.findOne({ where: { email } });

    const hashpass = await bcrypt.compare(password, user.hashpass);
    if (!hashpass) {
      throw new Error('Неверный пароль');
    }

    const plainUser = user.get();

    delete plainUser.hashpass;

    return plainUser;
  }
}

module.exports = AuthService