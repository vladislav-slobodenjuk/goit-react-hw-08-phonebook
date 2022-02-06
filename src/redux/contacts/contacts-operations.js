import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('contacts');
      toast.success('Вот ваши божественные контакты');

      return data;
    } catch (error) {
      console.dir(error);
      return rejectWithValue(error.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (args, { getState, rejectWithValue }) => {
    const newContact = { ...args };
    const state = getState();
    const contacts = state.contacts.items;

    const isAdded = contacts.find(contact => contact.name === newContact.name);
    if (isAdded) {
      toast.error('Такой контакт уже есть');
      return rejectWithValue('contact is already added');
    }

    try {
      const { data } = await axios.post('contacts', newContact);
      toast.success('Контакт добавлен');

      return data;
    } catch (error) {
      console.dir(error);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const deleteResult = await axios.delete(`contacts/${contactId}`);
      toast.warn('Контак удален');

      return contactId;
    } catch (error) {
      console.dir(error);
      return rejectWithValue(error.message);
    }
  },
);
