import axios from 'axios';
import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Col, Container, Form } from 'react-bootstrap';
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
            <div className="create-word-button-container">
              <button
                type="button"
                className={`main-button ${showForm ? 'form-open' : ''}`}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '✕ Закрыть форму' : '+ Создать слово'}
              </button>
            </div>

            {showForm && (
              <div className="add-word-form-container">
                <Form onSubmit={submitHandler} className="add-word-form">
                  <h3 className="form-title">Добавить новое слово</h3>

                  <div className="form-group">
                    <label className="form-label">Слово</label>
                    <Form.Control
                      type="text"
                      name="name"
                      className="form-input"
                      required
                      placeholder="Введите слово"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Категория</label>
                    <Form.Select
                      aria-label="Категория"
                      name="category"
                      className="form-select"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      <option value="Поколение Z">Поколение Z</option>
                      <option value="Миллениалы">Миллениалы</option>
                      <option value="Бумеры">Бумеры</option>
                    </Form.Select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Описание</label>
                    <Form.Control
                      type="text"
                      name="desc"
                      className="form-input"
                      required
                      placeholder="Опишите значение слова"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Пример использования</label>
                    <Form.Control
                      type="text"
                      name="example"
                      className="form-input"
                      required
                      placeholder="Приведите пример использования"
                    />
                  </div>

                  <button type="submit" className="form-submit-button">
                    Добавить слово
                  </button>
                </Form>
              </div>
            )}
          </div>
          <Container className="words-container">
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
        <div className="guest-message">
          <p className="guest-message-text">Вы не вошли в систему.</p>
        </div>
      )}
    </div>
  );
}
