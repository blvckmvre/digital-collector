import { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../../types/users";
import { changeSettingsAction } from "../../../actions/auth-actions";
import { AuthStateType } from "../auth-slice";

const settingsReducer = {
  [changeSettingsAction.pending.type]: (state: AuthStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [changeSettingsAction.fulfilled.type]: (
    state: AuthStateType,
    action: PayloadAction<IUser>
  ) => {
    state.userData = action.payload;
    state.isLoading = false;
  },
  [changeSettingsAction.rejected.type]: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default settingsReducer;
