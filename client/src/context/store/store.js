import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducers';
// import { createBrowserHistory } from "history";

const store = configureStore({
  reducer: rootReducer,
});

//Replace the links const for appSettings when its deployment is properly tested

export const API = 'http://localhost:4000/v1';
// export const history = createBrowserHistory();
export default store;
