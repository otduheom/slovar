import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import CardWord from '../ui/CardWords';

export default function MainPage({ user }) {
  //Слова из БД

  const [words, setWords] = useState([]);
  // Загружаем сохраненную категорию из localStorage при инициализации
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const savedCategory = localStorage.getItem('selectedCategory');
    return savedCategory || null;
  });

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

  // Сохраняем выбранную категорию в localStorage при изменении
  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('selectedCategory', selectedCategory);
    } else {
      localStorage.removeItem('selectedCategory');
    }
  }, [selectedCategory]);
 
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

  const handleDeleteWord = async (wordId) => {
    try {
      await axiosInstance.delete(`/words/${wordId}`);
      // Удаляем слово из списка
      setWords((prev) => prev.filter((word) => word.id !== wordId));
    } catch (error) {
      console.error('Error deleting word:', error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || 'Ошибка при удалении слова');
    }
  };

  const isAdmin = user?.status === 'logged' && user?.data?.isAdmin;

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title gradient-title">Понимайте язык всех поколений</h1>
        <p className="hero-subtitle">От зумеров до бумеров — изучайте сленг разных эпох</p>
      </div>
      {user?.status === 'logged' ? (
        <>
          <div className="buttons-container">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`main-button ${selectedCategory === null ? 'active' : ''}`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedCategory('Миллениалы')}
              className={`main-button ${selectedCategory === 'Миллениалы' ? 'active' : ''}`}
            >
              Миллениалы
            </button>
            <button
              onClick={() => setSelectedCategory('Бумеры')}
              className={`main-button ${selectedCategory === 'Бумеры' ? 'active' : ''}`}
            >
              Бумеры
            </button>
            <button
              onClick={() => setSelectedCategory('Поколение Z')}
              className={`main-button ${selectedCategory === 'Поколение Z' ? 'active' : ''}`}
            >
              Зумеры
            </button>
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
          <Container style={{ marginTop: '2rem' }}>
            <Row className="g-4">
              {filteredWords.map((word) => (
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
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.25rem', color: '#4a5568' }}>Вы не вошли в систему.</p>
        </div>
      )}
    </div>
  );
}
