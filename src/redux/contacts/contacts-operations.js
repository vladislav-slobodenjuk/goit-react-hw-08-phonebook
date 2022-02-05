import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// axios.defaults.baseURL = 'https://61f1c37d072f86001749f37f.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('contacts');
      //toast

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
      alert('contact is added');
      //toast
      return rejectWithValue('contact is added');
    }

    try {
      const { data } = await axios.post('contacts', newContact);

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
      alert('contact is deleted');
      // toast

      return contactId;
    } catch (error) {
      console.dir(error);
      return rejectWithValue(error.message);
    }
  },
);
