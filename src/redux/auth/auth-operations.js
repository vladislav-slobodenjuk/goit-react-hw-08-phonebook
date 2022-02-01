import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const userInstance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  timeout: 2000,
});
// UserInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    // userInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    userInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    // userInstance.defaults.headers.common.Authorization = '';
    userInstance.defaults.headers.common.Authorization = '';
  },
};

/*
POST /users​/signup
 * body: {  "name": "Adrian Cross",  "email": "across@mail.com",  "password": "examplepassword"}
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await userInstance.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

/*
 * POST @ /users/login
 * body: {  "email": "string",  "password": "string"}
 * После успешного логина добавляем токен в HTTP-заголовок
 */
const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await userInstance.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка
 */
const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await userInstance.post('/users/logout');
    token.unset();
  } catch (error) {
    // TODO: Добавить обработку ошибки error.message
  }
});
/*
 * GET @ /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      console.log('Токена нет, уходим из fetchCurrentUser');
      return thunkAPI.rejectWithValue();
    }

    // token.set(persistedToken);
    try {
      const { data } = await userInstance.get('/users/current');
      return data;
    } catch (error) {
      // TODO: Добавить обработку ошибки error.message
    }
  },
);

const operations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default operations;
