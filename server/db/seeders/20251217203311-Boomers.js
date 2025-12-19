'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      {
        name: 'Кассета',
        category: 'Бумеры',
        desc: 'Компактная магнитная лента для записи и воспроизведения звука',
        example: 'Нашел старую кассету с записями группы "Кино".',
        countLike: 8,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Дискета',
        category: 'Бумеры',
        desc: 'Гибкий магнитный диск для хранения данных на компьютере',
        example: 'Раньше все программы устанавливали с дискет.',
        countLike: 2,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Пейджер',
        category: 'Бумеры',
        desc: 'Устройство для приема коротких текстовых сообщений',
        example: 'В 90-е у всех бизнесменов были пейджеры.',
        countLike: 5,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Факс',
        category: 'Бумеры',
        desc: 'Устройство для передачи документов по телефонной линии',
        example: 'Отправь документы по факсу, это быстрее почты.',
        countLike: 1,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Видеомагнитофон',
        category: 'Бумеры',
        desc: 'Устройство для записи и воспроизведения видеокассет',
        example: 'В детстве смотрели фильмы на видеомагнитофоне.',
        countLike: 7,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Пластинка',
        category: 'Бумеры',
        desc: 'Виниловая пластинка для проигрывания музыки',
        example: 'Коллекция пластинок занимает целую стену.',
        countLike: 10,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Телефон-автомат',
        category: 'Бумеры',
        desc: 'Публичный телефонный аппарат, работающий от монет или карт',
        example: 'Звонил с телефона-автомата, когда мобильных еще не было.',
        countLike: 3,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Диапроектор',
        category: 'Бумеры',
        desc: 'Устройство для просмотра диафильмов и слайдов',
        example: 'В школе показывали учебные фильмы через диапроектор.',
        countLike: 4,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Магнитофон',
        category: 'Бумеры',
        desc: 'Устройство для записи и воспроизведения звука на магнитной ленте',
        example: 'Записывал музыку с радио на магнитофон.',
        countLike: 6,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Телеграмма',
        category: 'Бумеры',
        desc: 'Срочное сообщение, передаваемое по телеграфу',
        example: 'Получил телеграмму о важном событии.',
        countLike: 0,
        public: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Words', words, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Words', {
      category: 'Бумеры',
    });
  },
};
