import { createAsyncThunk } from "@reduxjs/toolkit";
import $req from "../../axios/config";
import useAnnounce from "../../hooks/useAnnounce";
import { IBook } from "../../types/books";
import { ITradeOffer } from "../../types/trade";
import { IUser } from "../../types/users";

export const getReceivedOffersAction = createAsyncThunk(
  "trades/received",
  async (_, thunkAPI) => {
    try {
      const res = await $req.get<ITradeOffer[]>("/trades/received");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const getSentOffersAction = createAsyncThunk(
  "trades/sent",
  async (_, thunkAPI) => {
    try {
      const res = await $req.get<ITradeOffer[]>("/trades/sent");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const getCompletedTradesAction = createAsyncThunk(
  "trades/completed",
  async (_, thunkAPI) => {
    try {
      const res = await $req.get<ITradeOffer[]>("/trades/completed");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

interface IAddOfferParams {
  partner: IUser;
  gives: IBook;
  gets: IBook;
  announce: ReturnType<typeof useAnnounce>;
}

export const addOfferAction = createAsyncThunk(
  "trades/add",
  async (params: IAddOfferParams, thunkAPI) => {
    try {
      const { announce, gets, gives, partner } = params;
      const res = await $req.post<ITradeOffer>("/trades/add", {
        gets,
        gives,
        partner,
      });
      announce("success", "Trade offer has been made");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

interface IRespondOfferParams {
  id: number;
  announce: ReturnType<typeof useAnnounce>;
}

export const completeTradeAction = createAsyncThunk(
  "trades/complete",
  async (params: IRespondOfferParams, thunkAPI) => {
    try {
      const { announce, id } = params;
      const res = await $req.post<number>("/trades/complete", { id });
      announce("success", "Trade offer has been accepted");
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);

export const rejectOfferAction = createAsyncThunk(
  "trades/reject",
  async (id: number, thunkAPI) => {
    try {
      const res = await $req.post<number>("/trades/reject", { id });
      return res.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message ?? e.message);
    }
  }
);
