import { createAsyncThunk } from "@reduxjs/toolkit";
import $req from "../../axios/config";
import useAnnounce from "../../hooks/useAnnounce";
import { IUser } from "../../types/users";

interface IAuthParams {
  username: string;
  password: string;
  announce: ReturnType<typeof useAnnounce>;
}

export const signupAction = createAsyncThunk(
  "auth/signup",
  async (params: IAuthParams, thunkAPI) => {
    try {
      const { announce, password, username } = params;
      await $req.post("/auth/signup", { username, password });
      announce("success", "Account has been created");
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (params: IAuthParams, thunkAPI) => {
    try {
      const { announce, password, username } = params;
      const res = await $req.post<IUser>("/auth/login", { username, password });
      announce("success", "You have logged in");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const checkAction = createAsyncThunk(
  "auth/check",
  async (_, thunkAPI) => {
    try {
      const res = await $req.get<IUser>("/auth/check");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (announce: ReturnType<typeof useAnnounce>, thunkAPI) => {
    try {
      await $req.get("/auth/logout");
      announce("success", "You have logged out");
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

interface ISettingsParams {
  displayname: string; 
  location: string
  announce: ReturnType<typeof useAnnounce>;
}

export const changeSettingsAction = createAsyncThunk(
  "auth/settings",
  async (params: ISettingsParams, thunkAPI) => {
    try {
      const {announce, displayname, location} = params;
      const res = await $req.post<IUser>("/auth/settings", {displayname, location});
      announce("success", "Settings have been updated");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);
