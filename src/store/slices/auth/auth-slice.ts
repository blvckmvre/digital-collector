import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/users";
import { WritableDraft } from "immer/dist/internal";
import signupReducer from "./reducers/signup-reducer";
import loginReducer from "./reducers/login-reducer";
import logoutReducer from "./reducers/logout-reducer";
import checkReducer from "./reducers/check-reducer";
import settingsReducer from "./reducers/settings-reducer";

interface IAuthState {
  userData: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  signupUsername: string;
  signupPassword: string;
  loginUsername: string;
  loginPassword: string;
  displayname: string;
  location: string;
}

export type AuthStateType = WritableDraft<IAuthState>;

const initialState: IAuthState = {
  userData: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  signupUsername: "",
  signupPassword: "",
  loginUsername: "",
  loginPassword: "",
  displayname: "",
  location: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupUsername: (state, action: PayloadAction<string>) => {
      state.signupUsername = action.payload;
    },
    setSignupPassword: (state, action: PayloadAction<string>) => {
      state.signupPassword = action.payload;
    },
    setLoginUsername: (state, action: PayloadAction<string>) => {
      state.loginUsername = action.payload;
    },
    setLoginPassword: (state, action: PayloadAction<string>) => {
      state.loginPassword = action.payload;
    },
    setDisplayname: (state, action: PayloadAction<string>) => {
      state.displayname = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    }
  },
  extraReducers: {
    ...signupReducer,
    ...loginReducer,
    ...logoutReducer,
    ...checkReducer,
    ...settingsReducer
  },
});

export default authSlice;
