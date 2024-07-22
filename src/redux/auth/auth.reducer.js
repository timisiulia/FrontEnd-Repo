import { createSlice } from '@reduxjs/toolkit';
import jwt from 'jsonwebtoken';
import Cookies from "universal-cookie/lib";

const initialState = {
  id: 0,
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  role: '',
  exp: undefined
};

const cookies = new Cookies();

const authReducer = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      const { accessToken } = action.payload;

      const decoded = jwt.decode(accessToken);

      const payload = {
        id: decoded.id,
        email: decoded.email,
        username: decoded.username,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded?.roles?.[0],
        exp: decoded.exp
      }

      cookies.set('access_token', accessToken, { expires: new Date(decoded.exp * 1000) })

      return payload;
    },
    removeAuthUser() {
      cookies.remove('access_token');

      return initialState;
    },
  },
});

export default authReducer;

export const { setAuthUser, removeAuthUser } = authReducer.actions;
