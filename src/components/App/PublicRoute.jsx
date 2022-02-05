import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import authSelectors from 'redux/auth/auth-selectors';

export default function PublicRoute({
  children,
  redirectTo = '/',
  restricted = false,
  ...routProps
}) {
  const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return (
    <Route {...routProps}>
      {shouldRedirect ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
}
