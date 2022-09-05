import { createSlice } from "@reduxjs/toolkit";
import { IBook } from "../../../types/books";
import { WritableDraft } from "immer/dist/internal";
import getReducer from "./reducers/get-reducer";
import addReducer from "./reducers/add-reducer";
import rmReducer from "./reducers/rm-reducer";
import getMyReducer from "./reducers/getmy-reducer";

interface IBookState {
  userBooks: IBook[];
  myBooks: IBook[];
  isLoading: boolean;
  error: string | null;
};

export type BookStateType = WritableDraft<IBookState>;

const initialState: IBookState = {
  userBooks: [],
  myBooks: [],
  isLoading: false,
  error: null
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    ...getReducer,
    ...getMyReducer,
    ...addReducer,
    ...rmReducer
  }
});

export default booksSlice;