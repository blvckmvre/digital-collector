import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IBooksApiResponse } from "../../types/books";

export const searchBooksAction = createAsyncThunk(
  "books/search",
  async (query: string, thunkAPI) => {
    try {
      if(!query) return [];
      const res = await axios.get<IBooksApiResponse>(
        "https://openlibrary.org/search.json",
        {
          params: {
            q: query,
            fields: "key,author_name,title",
            limit: 5,
          },
        }
      );
      return res.data.docs;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);
