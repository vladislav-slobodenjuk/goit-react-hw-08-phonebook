import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import authOperations from 'redux/auth/auth-operations';
import authSelectors from 'redux/auth/auth-selectors';

import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';
import PrivateRoute from 'components/App/PrivateRoute';
import PublicRoute from 'components/App/PublicRoute';
import Spinner from 'components/Spinner/Spinner';

const HomeView = lazy(() => import('views/HomeView'));
const RegisterView = lazy(() => import('views/RegisterView'));
const LoginView = lazy(() => import('views/LoginView'));
const Phonebook = lazy(() => import('views/PhonebookView'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(authSelectors.selectIsRefreshing);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Container>
        <AppBar />

        <Switch>
          <Suspense fallback={<Spinner />}>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>

            <PublicRoute path="/register" restricted>
              <RegisterView />
            </PublicRoute>

            <PublicRoute path="/login" redirectTo="/phonebook" restricted>
              <LoginView />
            </PublicRoute>

            <PrivateRoute path="/phonebook">
              <Phonebook />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Container>
    )
  );
}
