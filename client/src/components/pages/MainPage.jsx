import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container } from 'react-bootstrap';
import CardWord from '../ui/CardWords';

export default function MainPage({ user }) {
  //Слова из БД

  const [words, setWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios.get('/api/words').then((response) => {
      setWords(response.data);
      console.log(response.data);
    });
  }, []);

  // Фильтрация слов по выбранной категории
  const filteredWords = selectedCategory
    ? words.filter((word) => word.category === selectedCategory)
    : words;

  //Регистрация

  const testProtectedRequest = async () => {
    try {
      // Запрос пойдет на /api/test (baseURL + /test)
      const res = await axiosInstance.get('/test');
      console.log('Success response from /api/test:', res.data);
      alert(`Success: ${res.data.message}\nUser email: ${res.data.userDataFromToken.email}`);
    } catch (error) {
      console.error(
        'Error response from /api/test:',
        error.response ? error.response.data : error.message,
      );
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <>
      <h2>Добро пожаловать на главную страницу</h2>
      {user?.status === 'logged' ? (
        <>
          <p>Вы вошли как {user.data.name || user.data.email}.</p>

          <div className="buttons-container">
            <button onClick={() => setSelectedCategory('Миллениалы')} className="main-button">
              Миллениалы
            </button>
            <button onClick={() => setSelectedCategory('Бумеры')} className="main-button">
              Бумеры
            </button>
            <button onClick={() => setSelectedCategory('Поколение Z')} className="main-button">
              Зумеры
            </button>
          </div>
          <Container>
            <Row className="g-4">
              {filteredWords.map((word) => (
                <Col sm={4} key={word.id} className="d-flex">
                  <CardWord word={word} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <p>Вы не вошли в систему.</p>
      )}
    </>
  );
}
