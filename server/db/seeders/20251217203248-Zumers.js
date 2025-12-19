'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Кринжануть',
        category: 'Поколение Z',
        desc: 'Совершить что-то неловкое, постыдное',
        example: 'Я так кринжанул на вечеринке, все смотрели на меня.',
        countLike: 10,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Буллинг',
        category: 'Поколение Z',
        desc: 'Травля, агрессивное преследование в интернете или реальной жизни',
        example: 'В школе был буллинг, но я справился.',
        countLike: 1,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Мейнстрим',
        category: 'Поколение Z',
        desc: 'Что-то популярное, массовое, общепринятое',
        example: 'ТикТок уже не мейнстрим, все перешли на новую платформу.',
        countLike: 7,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Стримить',
        category: 'Поколение Z',
        desc: 'Вести прямую трансляцию в интернете, обычно игр или развлечений',
        example: 'Каждый вечер стримлю свою игру на Twitch.',
        countLike: 9,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Шипперить',
        category: 'Поколение Z',
        desc: 'Поддерживать романтические отношения между персонажами или людьми (от англ. ship)',
        example: 'Я шипперю этих двух актеров, они так мило смотрятся вместе.',
        countLike: 4,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Флексить',
        category: 'Поколение Z',
        desc: 'Хвастаться, показывать свои достижения или вещи',
        example: 'Перестань флексить своими деньгами, это не круто.',
        countLike: 6,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Скриншот',
        category: 'Поколение Z',
        desc: 'Снимок экрана, фотография того, что отображается на мониторе',
        example: 'Скинь скриншот переписки, хочу посмотреть.',
        countLike: 3,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Хайп',
        category: 'Поколение Z',
        desc: 'Ажиотаж, повышенное внимание к чему-то, популярность',
        example: 'Вокруг этого фильма такой хайп, все только о нем и говорят.',
        countLike: 8,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Тренд',
        category: 'Поколение Z',
        desc: 'Популярное направление, модная тенденция',
        example: 'Этот танец сейчас в тренде, все его повторяют.',
        countLike: 5,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Лайфхак',
        category: 'Поколение Z',
        desc: 'Полезный совет, способ упростить или улучшить что-то',
        example: 'Поделился лайфхаком, как быстро убрать квартиру.',
        countLike: 2,
        public: true,
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
