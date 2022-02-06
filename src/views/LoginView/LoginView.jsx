import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

import styles from './LoginView.module.scss';

export default function LoginView() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    return name === 'email' ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Страница логина</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Почта
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </label>

        <label className={styles.label}>
          Пароль
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
