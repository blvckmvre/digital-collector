import { PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../../types/books";
import { addBookAction } from "../../../actions/books-actions";
import { BookStateType } from "../books-slice";

const addReducer = {
  [addBookAction.pending.type]: (state: BookStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [addBookAction.fulfilled.type]: (
    state: BookStateType,
    action: PayloadAction<IBook>
  ) => {
    state.isLoading = false;
    state.userBooks.push(action.payload);
  },
  [addBookAction.rejected.type]: (
    state: BookStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default addReducer;
