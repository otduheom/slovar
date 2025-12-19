import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container } from 'react-bootstrap';
import CardWord from '../ui/CardWords';

function ModerationPage({ user }) {
  const [unpublishedWords, setUnpublishedWords] = useState([]);

  const fetchUnpublishedWords = async () => {
    try {
      const response = await axiosInstance.get('/words/moderation');
      setUnpublishedWords(response.data);
    } catch (error) {
      console.error('Error fetching unpublished words:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (user?.status === 'logged' && user?.data?.isAdmin) {
      fetchUnpublishedWords();
    }
  }, [user]);

  const handleApproveWord = async (wordId) => {
    try {
      await axiosInstance.patch(`/words/${wordId}/public`, { public: true });
      // Удаляем слово из списка после одобрения
      setUnpublishedWords((prev) => prev.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error('Error approving word:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Ошибка при одобрении слова');
    }
  };

  const handleRejectWord = async (wordId) => {
    try {
      if (window.confirm('Вы уверены, что хотите отклонить это слово? Оно будет удалено.')) {
        await axiosInstance.delete(`/words/${wordId}`);
        // Удаляем слово из списка после отклонения
        setUnpublishedWords((prev) => prev.filter((word) => word.id !== wordId));
      }
    } catch (error) {
      console.error('Error rejecting word:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Ошибка при отклонении слова');
    }
  };

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title gradient-title">Модерация</h1>
        <p className="hero-subtitle">Слова, ожидающие модерации</p>
      </div>
      {unpublishedWords.length === 0 ? (
        <div className="guest-message">
          <p className="guest-message-text">Нет слов, ожидающих модерации</p>
        </div>
      ) : (
        <Container>
          <Row className="g-4">
            {unpublishedWords.map((word) => (
              <Col sm={4} key={word.id} className="d-flex">
                <div className="word-card">
                  <h3 className="word-card-title">{word.name}</h3>
                  <span className={`word-card-category ${
                    word.category === 'Миллениалы' ? 'millennials' :
                    word.category === 'Бумеры' ? 'boomers' :
                    word.category === 'Поколение Z' ? 'genz' : ''
                  }`}>
                    {word.category}
                  </span>
                  <p className="word-card-desc">{word.desc}</p>
                  {word.example && (
                    <p className="word-card-example">{word.example}</p>
                  )}
                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="moderation-approve-button"
                      onClick={() => handleApproveWord(word.id)}
                    >
                      ✓ Одобрить
                    </button>
                    <button
                      type="button"
                      className="moderation-reject-button"
                      onClick={() => handleRejectWord(word.id)}
                    >
                      ✕ Отклонить
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default ModerationPage;

