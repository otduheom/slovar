import Card from 'react-bootstrap/Card';

export default function CardWord({ word, onToggleLike }) {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{word.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{word.category}</Card.Subtitle>
        <Card.Text>{word.desc}</Card.Text>
        <Card.Text>{word.example}</Card.Text>
        <button type="button" className="main-button" onClick={() => onToggleLike(word.id)}>
          {word.countLike}
        </button>
      </Card.Body>
    </Card>
  );
}
