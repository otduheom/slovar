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
  // Состояние для фильтра "Топ 10"
  const [showTop10, setShowTop10] = useState(() => {
    return localStorage.getItem('showTop10') === 'true';
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

  // Сохраняем состояние "Топ 10" в localStorage
  useEffect(() => {
    if (showTop10) {
      localStorage.setItem('showTop10', 'true');
    } else {
      localStorage.removeItem('showTop10');
    }
  }, [showTop10]);

  // Фильтрация слов

  const filteredWords = (() => {
    // 1. Сначала оставляем только публичные слова
    const publicWords = words.filter((word) => word.public === true);
  
    if (showTop10) {
      // 2. Сортируем уже отфильтрованные публичные слова по лайкам и берем первые 10
      return [...publicWords]
        .sort((a, b) => (b.countLike || 0) - (a.countLike || 0))
        .slice(0, 10);
    }
  
    if (selectedCategory) {
      // 3. Фильтруем публичные слова по выбранной категории
      return publicWords.filter((word) => word.category === selectedCategory);
    }
  
    // 4. Возвращаем все публичные слова, если другие фильтры не применены
    return publicWords;
  })();

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
              onClick={() => {
                setShowTop10(false);
                setSelectedCategory(null);
              }}
              className={`main-button ${!showTop10 && selectedCategory === null ? 'active' : ''}`}
            >
              Все
            </button>
            <button
              onClick={() => {
                setShowTop10(false);
                setSelectedCategory('Миллениалы');
              }}
              className={`main-button ${
                !showTop10 && selectedCategory === 'Миллениалы' ? 'active' : ''
              }`}
            >
              Миллениалы
            </button>
            <button
              onClick={() => {
                setShowTop10(false);
                setSelectedCategory('Бумеры');
              }}
              className={`main-button ${
                !showTop10 && selectedCategory === 'Бумеры' ? 'active' : ''
              }`}
            >
              Бумеры
            </button>
            <button
              onClick={() => {
                setShowTop10(false);
                setSelectedCategory('Поколение Z');
              }}
              className={`main-button ${
                !showTop10 && selectedCategory === 'Поколение Z' ? 'active' : ''
              }`}
            >
              Зумеры
            </button>
            <button
              onClick={() => {
                setShowTop10(true);
                setSelectedCategory(null);
              }}
              className={`main-button ${showTop10 ? 'active' : ''}`}
            >
              Топ 10
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
