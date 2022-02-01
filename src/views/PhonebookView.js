import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contacts-operations';

import Container from 'components/Container/Container';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

import s from 'components/App/App.module.scss';

export default function Phonebook() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <div className={s.app}>
        <h1>Phonebook</h1>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Container>
  );
}
