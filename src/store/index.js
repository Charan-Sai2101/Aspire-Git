import { configureStore } from "@reduxjs/toolkit";
import movieReducer from '../reducers/movieReducers';

const store = configureStore({
   reducer: movieReducer,
});
// console.log(store);
  
export default store;
