import { createSlice } from '@reduxjs/toolkit';

//structure
// const event = {
//   id: 0,
//   description: '',
//   location: '',
//   start: '',
//   end: '',
//   recurrency: false,
//   recurrencyPeriod: 0
// }

const initialState = [];

const eventsReducer = createSlice({
  name: 'eventsState',
  initialState,
  reducers: {
    setEventsList(state, action) {
      return action.payload;
    },
  },
});

export default eventsReducer;

export const { setEventsList } = eventsReducer.actions;
