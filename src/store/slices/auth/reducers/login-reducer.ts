import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../../types/users";
import { loginAction } from "../../../actions/auth-actions";
import { AuthStateType } from "../auth-slice";

const loginReducer = {
  [loginAction.pending.type]: (state: AuthStateType) => {
    state.isLoading = true;
    state.error = null;
    state.loginUsername = "";
    state.loginPassword = "";
  },
  [loginAction.fulfilled.type]: (
    state: AuthStateType,
    action: PayloadAction<IUser>
  ) => {
    state.isLoading = false;
    state.userData = action.payload;
    state.isLoggedIn = true;
  },
  [loginAction.rejected.type]: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => {
    state.isLoading = false;
    state.error = action.payload;
  },
};

export default loginReducer;
