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

  return (
    <div>
      <h2>{user?.data?.name}</h2>
      <h3>Мои лайкнутые слова</h3>
      {likedWords.length === 0 ? (
        <p>Вы еще не лайкнули ни одного слова</p>
      ) : (
        <Container>
          <Row className="g-4">
            {likedWords.map((word) => (
              <Col sm={4} key={word.id} className="d-flex">
                <CardWord word={word} onToggleLike={handleToggleLike} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Profile;