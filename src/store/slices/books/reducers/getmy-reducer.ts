import { PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../../types/books";
import { getMyBooksAction } from "../../../actions/books-actions";
import { BookStateType } from "../books-slice";

const getMyReducer = {
  [getMyBooksAction.pending.type]: (state: BookStateType) => {
    state.isLoading = true;
    state.error = null;
    state.myBooks = [];
  },
  [getMyBooksAction.fulfilled.type]: (
    state: BookStateType,
    action: PayloadAction<IBook[]>
  ) => {
    state.myBooks = action.payload;
    state.isLoading = false;
  },
  [getMyBooksAction.rejected.type]: (
    state: BookStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default getMyReducer;
