import { createAsyncThunk } from "@reduxjs/toolkit";
import $req from "../../axios/config";
import { IUser } from "../../types/users";

export const getUsersAction = createAsyncThunk(
  "users/get",
  async (id: number | void, thunkAPI) => {
    try {
      if(id) {
        const res = await $req.get<IUser>("/users", {
          params: { id }
        });
        return res.data;
      }
      const res = await $req.get<IUser[]>("/users");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);
