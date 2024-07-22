import { combineReducers } from 'redux';
import authReducer from "./auth/auth.reducer";
import eventsReducer from "./events/events.reducer";
import usersReducer from "./users/users.reducer";

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  events: eventsReducer.reducer,
  users: usersReducer.reducer
})

export default rootReducer;
