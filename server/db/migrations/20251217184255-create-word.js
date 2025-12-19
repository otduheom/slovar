'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Words', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.ENUM('Поколение Z', 'Миллениалы', 'Бумеры'),
        allowNull: false,
      },
      desc: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      example: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      countLike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      public: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Words');
  },
};
