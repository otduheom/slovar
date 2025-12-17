import React from "react";
import { Link } from "react-router";
import { Button } from 'react-bootstrap';
import NavBar from "../widgets/NavBar";

export default function MainPage() {
  return (
    <div>
      <h1>Главная</h1>
      <Link to="/about">На about</Link>
      <Button variant="outline-dark">Пвриет!</Button>
    </div>
  );
}
