import React from "react";
import { useState } from "react";
import MessageCard from "../widgets/MessageCard";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import NewMessageForm from "../widgets/NewMessageForm";
import axios from "axios";
import axiosInstance from "../shared/axiosInstance";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  // useEffect чтобы запрос ушел только при загрузке компонента, а не на каждое обновление
  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const addNewMessage = async (newMessage) => {
    const response = await axiosInstance.post("/messages", newMessage);
    setMessages([...messages, response.data]);
  };

  const deleteMessage = async (id) => {
    await axiosInstance.delete(`/messages/${id}`);
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <Container>
      <NewMessageForm addNewMessage={addNewMessage} />
      {messages.map((message) => (
        <MessageCard
          message={message}
          key={message.id}
          deleteMessage={deleteMessage}
        />
      ))}
    </Container>
  );
}
