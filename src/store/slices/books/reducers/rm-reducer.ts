import { PayloadAction } from "@reduxjs/toolkit";
import { rmBookAction } from "../../../actions/books-actions";
import { BookStateType } from "../books-slice";

const rmReducer = {
  [rmBookAction.pending.type]: (state: BookStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [rmBookAction.fulfilled.type]: (
    state: BookStateType,
    action: PayloadAction<number>
  ) => {
    state.isLoading = false;
    state.userBooks = state.userBooks.filter(
      (book) => book.id !== action.payload
    );
  },
  [rmBookAction.rejected.type]: (
    state: BookStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default rmReducer;
