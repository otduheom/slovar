import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";

// 1. Сделать сетевой запрос
// 2. Если успех, то изменить состояние messages

function MessageCard({ message, deleteMessage }) {
  return (
    <Card style={{ width: "18rem", marginTop: "5px" }}>
      <Card.Body>
        <Card.Title>{message.title}</Card.Title>
        <Card.Text>{message.content}</Card.Text>
        <br />
        <Card.Subtitle as={Link} to={`/messages/${message.id}`}>Подробнее</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default MessageCard;
