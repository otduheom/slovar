// seeders/YYYYMMDDHHMMSS-gen-z-words.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Рофл',
        category: 'Поколение Z',
        desc: 'Шутка, что-то смешное (от англ. ROFL - Rolling On the Floor Laughing)',
        example: 'Этот мем - просто рофл, чуть не помер со смеху.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сториз',
        category: 'Поколение Z',
        desc: 'Временные публикации в соцсетях, исчезающие через 24 часа',
        example: 'Залила в сториз фото с концерта.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Агриться',
        category: 'Поколение Z',
        desc: 'Злиться, раздражаться (от англ. агрессия)',
        example: 'Не агрься на меня, это же просто шутка.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Зашквар',
        category: 'Поколение Z',
        desc: 'Что-то позорное, не соответствующее нормам сообщества',
        example: 'Прийти в лузах на свидание - это зашквар.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Эщкере',
        category: 'Поколение Z',
        desc: "Восклицание, выражение радости или одобрения (от Let's get it)",
        example: 'Эщкере! Наконец-то выходные!',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Words', words, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', {
      category: 'Поколение Z',
    });
  },
};
