import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../../types/users";
import { checkAction } from "../../../actions/auth-actions";
import { AuthStateType } from "../auth-slice";

const checkReducer = {
  [checkAction.pending.type]: (state: AuthStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [checkAction.fulfilled.type]: (
    state: AuthStateType,
    action: PayloadAction<IUser>
  ) => {
    state.isLoading = false;
    state.isLoggedIn = true;
    state.userData = action.payload;
  },
  [checkAction.rejected.type]: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default checkReducer;
