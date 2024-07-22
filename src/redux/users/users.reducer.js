import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const usersReducer = createSlice({
  name: 'usersState',
  initialState,
  reducers: {
    setUsersList(state, action) {
      // {
      //   "id": 9,
      //   "username": "asdad",
      //   "lastName": "Istrati",
      //   "firstName": "Ion",
      //   "email": "3ion@ion.ion",
      //   "authorities": [
      //   {
      //     "authority": "USER"
      //   }
      // ],
      //   "enabled": true,
      //   "accountNonExpired": true,
      //   "credentialsNonExpired": true,
      //   "accountNonLocked": true
      // }
      return action.payload.map((user) => {
        return {
          id: user.id,
          username: user.username,
          lastName: user.lastName,
          firstName: user.firstName,
          email: user.email,
        }
      }, []);
    },
  },
});

export default usersReducer;

export const { setUsersList } = usersReducer.actions;
