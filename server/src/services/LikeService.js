const { Word, Like } = require('../../db/models');
class LikeService {
  static async toggleLike(userId, wordId) {
    const existingLike = await Like.findOne({
      where: {
        userId,
        wordId,
      },
    });

    if (existingLike) {
      await existingLike.destroy();
    } else {
      await Like.create({
        userId,
        wordId,
      });
    }

    // Пересчитываем количество лайков для слова и сохраняем в Word.countLike
    const likesCount = await Like.count({ where: { wordId } });
    await Word.update({ countLike: likesCount }, { where: { id: wordId } });

    return likesCount;
  }

  static async getLikedWords(userId) {
    // Находим все лайки пользователя
    const likes = await Like.findAll({
      where: { userId },
    });

    // Извлекаем массив wordId
    const wordIds = likes.map((like) => like.wordId);

    // Если нет лайков, возвращаем пустой массив
    if (wordIds.length === 0) {
      return [];
    }

    // Находим все слова по их id
    const words = await Word.findAll({
      where: {
        id: wordIds,
      },
    });

    return words;
  }
}

module.exports = LikeService;