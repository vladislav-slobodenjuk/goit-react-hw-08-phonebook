import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { setContactsFilter } from './contacts-actions';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/contacts-operations';

const itemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_state, { payload }) => payload,
  [addContact.fulfilled]: (state, { payload }) => [...state, payload],
  [deleteContact.fulfilled]: (state, { payload }) => {
    return state.filter(contact => contact.id !== payload);
  },
});

const filterReducer = createReducer('', {
  [setContactsFilter]: (_state, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
