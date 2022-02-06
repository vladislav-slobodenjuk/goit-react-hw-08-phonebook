import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

/*
POST /users​/signup
 * body: {  "name": "User Name",  "email": "user@mail.com",  "password": "examplepassword"}
 * После успешной регистрации добавляем токен в HTTP-заголовок
 */
const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/signup', credentials);
      token.set(data.token);
      toast.success('Вы успешно зарегестрировались');

      return data;
    } catch (error) {
      console.dir(error);
      toast.error('Что-то пошло не так 😕');

      return rejectWithValue(error.message);
    }
  },
);

/*
 * POST  /users/login
 * body: {  "email": "string",  "password": "string"}
 * После успешного логина добавляем токен в HTTP-заголовок
 */
const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      token.set(data.token);
      toast.success('Вы успешно авторизовались');

      return data;
    } catch (error) {
      console.dir(error);

      if (error.response.status === 400) {
        toast.error('неверная почта или пароль');
      }

      return rejectWithValue(error.message);
    }
  },
);

/*
 * POST  /users/logout
 * headers: Authorization: Bearer token
 * После успешного логаута, удаляем токен из HTTP-заголовка
 */
const logOut = createAsyncThunk(
  'auth/logout',
  async (_args, { rejectWithValue }) => {
    try {
      await axios.post('/users/logout');
      token.unset();
      toast.warn('Вы вышли из профиля');
    } catch (error) {
      console.dir(error);
      toast.error('Что-то пошло не так 😕');

      return rejectWithValue(error.message);
    }
  },
);
/*
 * GET  /users/current
 * headers:
 *    Authorization: Bearer token
 *
 * 1. Забираем токен из стейта через getState()
 * 2. Если токена нет, выходим не выполняя никаких операций
 * 3. Если токен есть, добавляет его в HTTP-заголовок и выполянем операцию
 */
const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrent',
  async (_args, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('token is absent');
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');

      return data;
    } catch (error) {
      console.dir(error);
      toast.error('Что-то пошло не так 😕');

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const authOperations = {
  register,
  logOut,
  logIn,
  fetchCurrentUser,
};
export default authOperations;
