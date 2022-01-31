import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { setContactsFilter } from './contacts-actions';
import {
  fetchContacts,
  AddContact,
  deleteContact,
} from 'redux/contacts/contacts-operations';

const ItemsReducer = createReducer([], {
  [fetchContacts.fulfilled]: (_state, { payload }) => {
    return payload;
  },
  [AddContact.fulfilled]: (state, { payload }) => {
    const isAdded = state.find(contact => contact.name === payload.name);
    if (!isAdded) return [...state, payload];
    alert('contact is added');
  },
  [deleteContact.fulfilled]: (state, { payload }) => {
    return state.filter(contact => contact.id !== payload.id);
  },
});

const filterReducer = createReducer('', {
  [setContactsFilter]: (_state, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items: ItemsReducer,
  filter: filterReducer,
});

export const rootReducer = combineReducers({
  contacts: contactsReducer,
});
