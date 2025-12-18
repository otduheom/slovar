import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import axiosInstance from '../../shared/lib/axiosInstance';

export default function MainPage({ user }) {
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
      <h2>Добро пожаловать на главную страницу</h2>
      {user?.status === 'logged' ? (
        <>
          <p>Вы вошли как {user.data.name || user.data.email}.</p>

          <div className="buttons-container">
            <button onClick={() => alert('Миллениалы')} className="main-button">
              Миллениалы
            </button>
            <button onClick={() => alert('Бумеры')} className="main-button">
              Бумеры
            </button>
            <button onClick={() => alert('Зумеры')} className="main-button">
              Зумеры
            </button>
          </div>
        </>
      ) : (
        <p>You are a guest.</p>
      )}
    </>
  );
}
