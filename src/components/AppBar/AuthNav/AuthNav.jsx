import { NavLink } from 'react-router-dom';

import s from './AuthNav.module.scss';

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="/register"
        exact
        className={s.link}
        activeStyle={{ color: '#E84A5F' }}
      >
        Регистрация
      </NavLink>
      <NavLink
        to="/login"
        exact
        className={s.link}
        activeStyle={{ color: '#E84A5F' }}
      >
        Логин
      </NavLink>
    </div>
  );
}
