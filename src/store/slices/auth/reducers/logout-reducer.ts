import { PayloadAction } from "@reduxjs/toolkit";
import { logoutAction } from "../../../actions/auth-actions";
import { AuthStateType } from "../auth-slice";

const logoutReducer = {
  [logoutAction.pending.type]: (state: AuthStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [logoutAction.fulfilled.type]: (state: AuthStateType) => {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.userData = null;
  },
  [logoutAction.rejected.type]: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default logoutReducer;
