import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
// axios.defaults.baseURL = 'https://61f1c37d072f86001749f37f.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_args, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('contacts');

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);

export const AddContact = createAsyncThunk(
  'contacts/addContact',
  async (args, { rejectWithValue }) => {
    const contact = { ...args };

    try {
      const { data } = await axios.post('contacts', contact);

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`contacts/${contactId}`);

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);
