'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Флексить',
        category: 'Миллениалы',
        desc: 'Хвастаться, демонстрировать свои достижения или материальные блага',
        example: 'Он постоянно флексит своими новыми кроссовками в инстаграме.',
        countLike: 7,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Хейтить',
        category: 'Миллениалы',
        desc: 'Критиковать, негативно высказываться о чем-то или ком-то (от англ. hate)',
        example: 'Не нужно хейтить его выбор, это его жизнь.',
        countLike: 3,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Кринж',
        category: 'Миллениалы',
        desc: 'Чувство неловкости, стыда за кого-то или что-то (от англ. cringe)',
        example: 'Это видео такой кринж, не могу смотреть.',
        countLike: 9,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Чилить',
        category: 'Миллениалы',
        desc: 'Расслабляться, отдыхать, ничего не делать (от англ. chill)',
        example: 'Сегодня просто чилю дома, никаких планов.',
        countLike: 5,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Свайпнуть',
        category: 'Миллениалы',
        desc: 'Провести пальцем по экрану, обычно в приложениях знакомств',
        example: 'Свайпнул вправо, понравился профиль.',
        countLike: 2,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Буст',
        category: 'Миллениалы',
        desc: 'Усиление, повышение эффективности или популярности',
        example: 'Новый пост дал буст подписчикам в инстаграме.',
        countLike: 8,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Краш',
        category: 'Миллениалы',
        desc: 'Человек, в которого влюблены, объект симпатии (от англ. crush)',
        example: 'Он мой краш уже полгода, но я боюсь признаться.',
        countLike: 6,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мерч',
        category: 'Миллениалы',
        desc: 'Фирменная одежда и аксессуары с символикой бренда или артиста (от англ. merchandise)',
        example: 'Купил новый мерч любимого блогера.',
        countLike: 4,
        public: true,
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
