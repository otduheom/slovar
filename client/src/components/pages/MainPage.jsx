import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import CardWord from '../ui/CardWords';

export default function MainPage({ user }) {
  //Слова из БД

  const [words, setWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //Форма
  const [showForm, setShowForm] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const response = await axios.post('/api/words', data);
    setWords([...words, response.data]);
    console.log(response.data);
  };

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

  const handleToggleLike = async (wordId) => {
    try {
      const res = await axiosInstance.post(`/words/${wordId}/like`);
      const { countLike } = res.data;

      setWords((prev) => prev.map((word) => (word.id === wordId ? { ...word, countLike } : word)));
    } catch (error) {
      console.error('Error toggling like:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <h2>Добро пожаловать на главную страницу</h2>
      {user?.status === 'logged' ? (
        <>
          <p>Вы вошли как {user.data.name || user.data.email}.</p>

          <div className="buttons-container">
            <Container>
              <Button type="submit" onClick={() => setShowForm(!showForm)}>
                Создать слово
              </Button>

              {showForm && (
                <Form onSubmit={submitHandler}>
                  Слово:
                  <Form.Control type="text" name="name" />
                  Категория:
                  <Form.Select aria-label="Категория" name="category">
                    <option>Категория</option>
                    <option value="Поколение Z">Поколение Z</option>
                    <option value="Миллениалы">Миллениалы</option>
                    <option value="Бумеры">Бумеры</option>
                  </Form.Select>
                  Описание:
                  <Form.Control type="text" name="desc" />
                  Пример использования:
                  <Form.Control type="text" name="example" />
                  <Button type="submit">Добавить слово</Button>
                </Form>
              )}

              <button onClick={() => setSelectedCategory('Миллениалы')} className="main-button">
                Миллениалы
              </button>
              <button onClick={() => setSelectedCategory('Бумеры')} className="main-button">
                Бумеры
              </button>
              <button onClick={() => setSelectedCategory('Поколение Z')} className="main-button">
                Зумеры
              </button>
            </Container>
          </div>
          <Container>
            <Row className="g-4">
              {filteredWords.map((word) => (
                <Col sm={4} key={word.id} className="d-flex">
                  <CardWord word={word} onToggleLike={handleToggleLike} />
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
