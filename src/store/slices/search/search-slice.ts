import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApiBook } from "../../../types/books";
import { searchBooksAction } from "../../actions/search-actions";

interface ISearchState {
  booksData: IApiBook[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

const initialState: ISearchState = {
  booksData: [],
  isLoading: false,
  error: null,
  query: "",
};

const searchSlice = createSlice({
  name: "book_search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: {
    [searchBooksAction.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [searchBooksAction.fulfilled.type]: (
      state,
      action: PayloadAction<IApiBook[]>
    ) => {
      state.booksData = action.payload;
      state.isLoading = false;
    },
    [searchBooksAction.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default searchSlice;
