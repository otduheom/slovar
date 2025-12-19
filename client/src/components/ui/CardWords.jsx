import Card from 'react-bootstrap/Card';
import axiosInstance from '../../shared/lib/axiosInstance';
import { useState } from 'react';

export default function CardWord({ word, onToggleLike, onDelete, isAdmin }) {
  //GigaChat
  //Пример использования слова из GigaChat

  const [showExample, setShowExample] = useState(false);

  const submitHandlerExample = async () => {
    const response = await axiosInstance.post('/ai/completion', { wordName: word.name });
    console.log(response);
  };

  const getCategoryClass = (category) => {
    if (category === 'Миллениалы') return 'millennials';
    if (category === 'Бумеры') return 'boomers';
    if (category === 'Поколение Z') return 'genz';
    return '';
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить это слово?')) {
      onDelete(word.id);
    }
  };

  return (
    <div className="word-card">
      <h3 className="word-card-title">{word.name}</h3>
      <span className={`word-card-category ${getCategoryClass(word.category)}`}>
        {word.category}
      </span>
      <p className="word-card-desc">{word.desc}</p>

      {/* {showExample && ( */}
        <button type="button" onClick={() => submitHandlerExample()}>
          Пример:{' '}
        </button>
      {/* )} */}
      {/* {showExample && <p>{submitHandlerExample}</p>} */}

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: 'auto' }}>
        <button
          type="button"
          className="word-card-like-button"
          onClick={() => onToggleLike(word.id)}
        >
          ❤️ {word.countLike || 0}
        </button>
        {isAdmin && (
          <button
            type="button"
            className="word-card-delete-button"
            onClick={handleDelete}
            title="Удалить слово"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
