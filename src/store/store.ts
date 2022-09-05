import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/auth-slice";
import booksSlice from "./slices/books/books-slice";
import searchSlice from "./slices/search/search-slice";
import tradeSlice from "./slices/trade/trade-slice";
import usersSlice from "./slices/users/users-slice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [booksSlice.name]: booksSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
  [tradeSlice.name]: tradeSlice.reducer
});

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type DispatchType = typeof store.dispatch;

export default store;