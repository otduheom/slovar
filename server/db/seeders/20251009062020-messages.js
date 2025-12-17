'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Вася',
        email: '2W5lM@example.com',
        hashpass: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Messages', [
      {
        title: 'Шутки про JS',
        content:
          "Почему JavaScript-разработчик разорился? Потому что он всё время использовал 'var' вместо 'let'! Кстати, вы пробовали выключить и включить?",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Пёс-дебаггер',
        content:
          'Я попросил собаку помочь отладить код. Она только залаяла на точки с запятой. Возможно, ей больше нравится Python! И вообще, не доверяйте компьютеру, которого нельзя выбросить в окно.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Тёмная тема',
        content:
          'Почему программисты любят тёмную тему? Потому что свет привлекает баги! Кстати, мой код работает идеально... пока кто-то другой не запустит его.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Бинарный юмор',
        content:
          'Я попытался написать шутку в бинаре, но получилось просто 01001100 01101111 01101100. И ещё: мой холодильник отправил мне запрос в друзья. Принимать?',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Курица и цикл',
        content:
          'Зачем курица перешла дорогу? Чтобы убежать от бесконечного цикла! И помните: в информатике есть две сложные вещи — инвалидация кэша и придумывание имён.',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
