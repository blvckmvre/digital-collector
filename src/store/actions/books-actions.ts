import { createAsyncThunk } from "@reduxjs/toolkit";
import $req from "../../axios/config";
import useAnnounce from "../../hooks/useAnnounce";
import { IApiBook, IBook } from "../../types/books";

export const getUserBooksAction = createAsyncThunk(
  "books/get",
  async (user_id: number, thunkAPI) => {
    try {
      const res = await $req.get<IBook[]>("/books", {
        params: {
          user_id,
        },
      });
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const getMyBooksAction = createAsyncThunk(
  "books/getmy",
  async (_, thunkAPI) => {
    try {
      const res = await $req.get<IBook[]>("/books");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

interface IAddBookParams {
  book: IApiBook;
  announce: ReturnType<typeof useAnnounce>;
}

export const addBookAction = createAsyncThunk(
  "books/add",
  async (params: IAddBookParams, thunkAPI) => {
    try {
      const { announce, book } = params;
      const res = await $req.post<IBook>("/books/add", { book });
      announce("success", "Book has been added to your collection");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

interface IRmBookParams {
  id: number;
  announce: ReturnType<typeof useAnnounce>;
}

export const rmBookAction = createAsyncThunk(
  "books/rm",
  async (params: IRmBookParams, thunkAPI) => {
    try {
      const { announce, id } = params;
      const res = await $req.post<{ id: number }>("/books/rm", { id });
      announce("success", "Book has been removed from your collection");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);
