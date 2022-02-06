import { useState } from 'react';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';

import styles from './RegisterView.module.scss';

export default function RegisterView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Страница регистрации</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Имя
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
          />
        </label>

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

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
