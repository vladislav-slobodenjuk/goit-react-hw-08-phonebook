import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authSelectors from 'redux/auth/auth-selectors';

import s from './Navigation.module.scss';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  return (
    <nav>
      <NavLink
        to="/"
        exact
        className={s.link}
        activeStyle={{ color: '#E84A5F' }}
      >
        Главная
      </NavLink>

      {isLoggedIn && (
        <NavLink
          to="/phonebook"
          exact
          className={s.link}
          activeStyle={{ color: '#E84A5F' }}
        >
          Phonebook
        </NavLink>
      )}
    </nav>
  );
}
