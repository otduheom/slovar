import Card from 'react-bootstrap/Card';

export default function CardWord({ word }) {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>{word.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{word.category}</Card.Subtitle>
        <Card.Text>{word.desc}</Card.Text>
        <Card.Text>{word.example}</Card.Text>
        <Card.Link href="#">{word.countLike}</Card.Link>
      </Card.Body>
    </Card>
  );
}
