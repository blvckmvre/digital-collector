import { PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../../types/books";
import { getUserBooksAction } from "../../../actions/books-actions";
import { BookStateType } from "../books-slice";

const getReducer = {
  [getUserBooksAction.pending.type]: (state: BookStateType) => {
    state.isLoading = true;
    state.error = null;
    state.userBooks = [];
  },
  [getUserBooksAction.fulfilled.type]: (
    state: BookStateType,
    action: PayloadAction<IBook[]>
  ) => {
    state.userBooks = action.payload;
    state.isLoading = false;
  },
  [getUserBooksAction.rejected.type]: (
    state: BookStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default getReducer;
