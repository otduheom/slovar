// seeders/YYYYMMDDHHMMSS-millennials-words.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Коворкинг',
        category: 'Миллениалы',
        desc: 'Общее рабочее пространство для фрилансеров и удаленных работников',
        example: 'Работаю из коворкинга, там есть все необходимое.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гуглить',
        category: 'Миллениалы',
        desc: 'Искать информацию в поисковой системе Google',
        example: 'Не знаешь ответ - просто погугли.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Айтишник',
        category: 'Миллениалы',
        desc: 'Специалист в сфере информационных технологий',
        example: 'Он айтишник, хорошо разбирается в программировании.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Селфи',
        category: 'Миллениалы',
        desc: 'Фотография самого себя, сделанная на расстоянии вытянутой руки',
        example: 'Сделала селфи на фоне достопримечательности.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Бренчить',
        category: 'Миллениалы',
        desc: 'Негромко играть на музыкальном инструменте',
        example: 'Вечерами он любил бренчать на гитаре.',
        countLike: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Words', words, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', {
      category: 'Миллениалы',
    });
  },
};
