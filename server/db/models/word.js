'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: 'Like', foreignKey: 'wordId' });
    }
  }
  Word.init(
    {
      name: DataTypes.STRING,
      category: {
        type: DataTypes.ENUM('Поколение Z', 'Миллениалы', 'Бумеры'), // ← ДОБАВЬТЕ ЗНАЧЕНИЯ
        allowNull: false,
      },
      desc: DataTypes.STRING,
      example: DataTypes.STRING,
      countLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Word',
    },
  );
  return Word;
};
