import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import authOperations from 'redux/auth/auth-operations';

import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';
import PrivateRoute from 'components/AppBar/PrivateRoute';
import PublicRoute from 'components/AppBar/PublicRoute';

const HomeView = lazy(() => import('views/HomeView'));
const RegisterView = lazy(() => import('views/RegisterView'));
const LoginView = lazy(() => import('views/LoginView'));
const Phonebook = lazy(() => import('views/PhonebookView'));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Switch>
        <Suspense fallback={<p>Загрузка...</p>}>
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
  );
}
