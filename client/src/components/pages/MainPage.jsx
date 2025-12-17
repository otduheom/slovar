import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axiosInstance from '../../shared/lib/axiosInstance';
import { Row, Container, Col } from 'react-bootstrap';

export default function MainPage({ user }) {
  const [words, setWords] = useState([]);
  const testProtectedRequest = async () => {
    try {
      // Запрос пойдет на /api/test (baseURL + /test)
      const res = await axiosInstance.get('/test');
      console.log('Success response from /api/test:', res.data);
      alert(`Success: ${res.data.message}\nUser email: ${res.data.userDataFromToken.email}`);
    } catch (error) {
      console.error(
        'Error response from /api/test:',
        error.response ? error.response.data : error.message,
      );
      alert(`Error: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <>
      <h2>Welcome to the Main Page</h2>
      {user?.status === 'logged' ? (
        <>
          <p>You are logged in as {user.data.name || user.data.email}.</p>
          
          <div className="buttons-container">
            <button 
              onClick={() => alert('Кнопка 1')} 
              className="main-button"
            >
              Кнопка 1
            </button>
            <button 
              onClick={() => alert('Кнопка 2')} 
              className="main-button"
            >
              Кнопка 2
            </button>
            <button 
              onClick={() => alert('Кнопка 3')} 
              className="main-button"
            >
              Кнопка 3
            </button>
          </div>
        </>
      ) : (
        <p>You are a guest.</p>
      )}
      <Container>
        <Row>
          {words.map((item) => (
            <Col sm={3}>
              <CardNews words={item} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Кнопка для проверки токена */}
      <button
        onClick={testProtectedRequest}
        style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
      >
        Test Protected API (/api/test)
      </button>
    </>
  );
}
