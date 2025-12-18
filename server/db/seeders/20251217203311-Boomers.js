'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Автоответчик',
        category: 'Бумеры',
        desc: 'Устройство для записи телефонных сообщений',
        example: 'Оставьте сообщение на автоответчике.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Виниловая пластинка',
        category: 'Бумеры',
        desc: 'Аналоговый носитель звуковой информации',
        example: 'Коллекционирую виниловые пластинки.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Телетайп',
        category: 'Бумеры',
        desc: 'Электромеханическая печатная машина для передачи сообщений',
        example: 'Новости получали через телетайп.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Диафильм',
        category: 'Бумеры',
        desc: 'Позитивная пленка с кадрами для проектора',
        example: 'В детстве смотрели диафильмы на стене.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Патефон',
        category: 'Бумеры',
        desc: 'Портативный граммофон с ручным приводом',
        example: 'На патефоне слушали пластинки.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Words', words, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', {
      category: 'Бумеры'
    });
  }
};