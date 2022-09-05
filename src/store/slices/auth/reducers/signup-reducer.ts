import { PayloadAction } from "@reduxjs/toolkit";
import { signupAction } from "../../../actions/auth-actions";
import { AuthStateType } from "../auth-slice";

const signupReducer = {
  [signupAction.pending.type]: (state: AuthStateType) => {
    state.isLoading = true;
    state.error = null;
    state.signupUsername = "";
    state.signupPassword = "";
  },
  [signupAction.fulfilled.type]: (state: AuthStateType) => {
    state.isLoading = false;
  },
  [signupAction.rejected.type]: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default signupReducer;
