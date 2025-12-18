import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container } from 'react-bootstrap';
import CardWord from '../ui/CardWords';

function Profile({ user }) {
  const [likedWords, setLikedWords] = useState([]);

  const fetchLikedWords = async () => {
    try {
      const response = await axiosInstance.get('/words/liked');
      setLikedWords(response.data);
    } catch (error) {
      console.error('Error fetching liked words:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (user?.status === 'logged') {
      fetchLikedWords();
    }
  }, [user]);

  const handleToggleLike = async (wordId) => {
    try {
      await axiosInstance.post(`/words/${wordId}/like`);
      // Перезагружаем список лайкнутых слов
      await fetchLikedWords();
    } catch (error) {
      console.error('Error toggling like:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteWord = async (wordId) => {
    try {
      await axiosInstance.delete(`/words/${wordId}`);
      // Удаляем слово из списка
      setLikedWords((prev) => prev.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error('Error deleting word:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Ошибка при удалении слова');
    }
  };

  const isAdmin = user?.status === 'logged' && user?.data?.isAdmin;

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title gradient-title">{user?.data?.name}</h1>
        <p className="hero-subtitle">Мои лайкнутые слова</p>
      </div>
      {likedWords.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>Вы еще не лайкнули ни одного слова</p>
        </div>
      ) : (
        <Container>
          <Row className="g-4">
            {likedWords.map((word) => (
              <Col sm={4} key={word.id} className="d-flex">
                <CardWord
                  word={word}
                  onToggleLike={handleToggleLike}
                  onDelete={handleDeleteWord}
                  isAdmin={isAdmin}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Profile;