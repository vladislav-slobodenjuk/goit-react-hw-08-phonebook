import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Container from 'components/Container/Container';
import AppBar from 'components/AppBar/AppBar';
import HomeView from 'views/HomeView';
import RegisterView from 'views/RegisterView';
import LoginView from 'views/LoginView';
import Phonebook from 'views/PhonebookView';

// import { fetchContacts } from 'redux/contacts/contacts-operations';
// import ContactForm from 'components/ContactForm/ContactForm';
// import ContactList from 'components/ContactList/ContactList';
// import Filter from 'components/Filter/Filter';
// import s from './App.module.scss';

export default function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContacts());
  // }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/register" component={RegisterView} />
        <Route path="/login" component={LoginView} />
        <Route path="/phonebook" component={Phonebook} />
      </Switch>
    </Container>
  );
}
