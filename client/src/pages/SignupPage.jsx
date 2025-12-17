import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { setAccessToken } from '../shared/axiosInstance';

function SignupPage({ setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('./api/auth/signup', form);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken)
  };

  const changeHandller = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={submitHandler}>
        <label>
          Ваше имя
          <input type='text' name='name' onChange={changeHandller} value={form.name} />
        </label>
        <label>
          Ваш email
          <input type='email' name='email' onChange={changeHandller} value={form.email} />
        </label>
        <label>
          Ваш пароль
          <input type='password' name='password' onChange={changeHandller} value={form.password} />
        </label>
        <button type='submit'>Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignupPage;
