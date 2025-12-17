import Card from 'react-bootstrap/Card';

function CardWord({ words }) {
  return (
    <Card style={{ width: '28rem' }}>
      <Card.Body>
        <Card.Title>{words}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{word.category}</Card.Subtitle>
        <Card.Text>{words.desc}</Card.Text>
        <Card.Text>{words.example}</Card.Text>
        <Card.Link href="#">{words.LikeLike}</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CardWord;
