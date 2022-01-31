import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/contacts/contacts-operations';

import s from './ContactList.module.scss';

export default function ContactList() {
  const dispatch = useDispatch();
  const filteredArray = useSelector(selectFilteredContacts);

  return (
    <ul className={s.contactList}>
      {filteredArray.map(({ name, number, id }) => (
        <li className={s.contactItem} key={id}>
          <p className={s.contactName}>
            {name}: {number}
          </p>
          <button
            className={s.contactButton}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
