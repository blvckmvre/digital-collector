import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/users";
import { getUsersAction } from "../../actions/users-actions";

interface IUsersState {
  users: IUser[];
  isLoading: boolean;
  error: string | null;
  currUser: IUser | null;
}

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
  currUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsersAction.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
      state.currUser = null;
    },
    [getUsersAction.fulfilled.type]: (
      state,
      action: PayloadAction<IUser[] | IUser>
    ) => {
      if (Array.isArray(action.payload)) state.users = action.payload;
      else state.currUser = action.payload;
      state.isLoading = false;
    },
    [getUsersAction.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default usersSlice;
