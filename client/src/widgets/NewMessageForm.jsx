import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function NewMessageForm({ addNewMessage }) {
  const [message, setMessage] = useState({
    title: "",
    content: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    await addNewMessage(message);

    setMessage({
      title: "",
      content: "",
    });
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          placeholder="Название"
          value={message.title}
          onChange={(e) => setMessage({ ...message, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Контент</Form.Label>
        <Form.Control
          type="text"
          placeholder="Контент"
          value={message.content}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
        />
      </Form.Group>
      <Button variant="outline-dark" type="submit">
        Отправить
      </Button>
    </Form>
  );
}

export default NewMessageForm;
