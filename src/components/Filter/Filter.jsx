import { useDispatch, useSelector } from 'react-redux';
import { setContactsFilter } from 'redux/contacts/contacts-actions';
import { selectFilter } from 'redux/contacts/contacts-selectors';

import s from './Filter.module.scss';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <>
      <label htmlFor="filter">Find contacts by name</label>
      <input
        className={s.filterInput}
        id="filter"
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        autoComplete="off"
        value={filter}
        onChange={e => dispatch(setContactsFilter(e.target.value))}
      />
    </>
  );
}
