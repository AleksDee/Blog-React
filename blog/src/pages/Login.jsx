import React, { useContext } from 'react';
import MyInput from '../components/UI/button/input/MyInput';
import MyButton from '../components/UI/button/MyButton';
import { AuthContext } from '../context';

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', true);
  };
  return (
    <div>
      <h1>Страница логина</h1>
      <form action="" onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="text" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </div>
  );
}
