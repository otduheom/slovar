import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  Form,
  FormText,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import axiosInstance from "../shared/axiosInstance";

export default function MessageDetailsPage({ user }) {
  const { messageId } = useParams();
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/messages/${messageId}`).then((res) => {
      setMessage(res.data);
    });
  }, [messageId]);

  if (!message) {
    return <div>Загрузка...</div>;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const response = await axiosInstance.put(`/messages/${message.id}`, data);
    setMessage((prev) => ({ ...prev, ...response.data }));
    setIsEditing(false);
  };

  const deleteMessage = async () => {
    await axiosInstance.delete(`/messages/${message.id}`);
    navigate("/");
  };

  if (isEditing) {
    return (
      <Container>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              defaultValue={message.title}
              name="title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Контент</Form.Label>
            <Form.Control
              as="textarea"
              cols={2}
              defaultValue={message.content}
              name="content"
            />
          </Form.Group>
          <Button variant="outline-secondary" type="submit">
            Сохранить
          </Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container>
      <h1>{message.title}</h1>
      <p>{message.content}</p>
      <p>{message.User.name}</p>
      {user.id === message.userId && (
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            onClick={() => setIsEditing(true)}
          >
            Редактировать
          </Button>
          {confirm ? (
            <Button onClick={deleteMessage} variant="danger">
              Точно удалить
            </Button>
          ) : (
            <Button variant="outline-danger" onClick={() => setConfirm(true)}>
              X
            </Button>
          )}
        </ButtonGroup>
      )}
      <Link to={`/messages/${Number(messageId) + 1}`}>next</Link>
    </Container>
  );
}
