const LikeService = require('../services/LikeService');

class LikeController {
  static async toggleLike(req, res) {
    try {
      const { id: userId } = res.locals.user;
      const { wordId } = req.params;

      const countLike = await LikeService.toggleLike(userId, wordId);

      return res.status(200).json({ countLike });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка при переключении лайка' });
    }
  }

  static async getLikedWords(req, res) {
    try {
      const { id: userId } = res.locals.user;
      const words = await LikeService.getLikedWords(userId);
      return res.status(200).json(words);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ошибка при получении лайкнутых слов' });
    }
  }
}

module.exports = LikeController;
