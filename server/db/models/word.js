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
      this.belongsToMany(models.User, { through: 'Like', foreignKey: 'WordId' });
    }
  }
  Word.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.ENUM,
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
