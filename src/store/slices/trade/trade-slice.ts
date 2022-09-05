import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../../types/books";
import { ITradeOffer } from "../../../types/trade";
import { WritableDraft } from "immer/dist/internal";
import receivedReducer from "./reducers/received-reducer";
import sentReducer from "./reducers/sent-reducer";
import completedRecuder from "./reducers/completed-reducer";
import addReducer from "./reducers/add-reducer";
import completeReducer from "./reducers/complete-reducer";
import rejectReducer from "./reducers/reject-reducer";

interface ITradeState {
  receivedOffers: ITradeOffer[];
  sentOffers: ITradeOffer[];
  completedTrades: ITradeOffer[];
  bookToGive: IBook | null;
  bookToGet: IBook | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ITradeState = {
  receivedOffers: [],
  bookToGet: null,
  bookToGive: null,
  completedTrades: [],
  sentOffers: [],
  error: null,
  isLoading: false
}

export type TradeStateType = WritableDraft<ITradeState>;

const tradeSlice = createSlice({
  name: "trades",
  initialState,
  reducers: {
    setBookToGet: (state, action: PayloadAction<IBook>) => {
      state.bookToGet = action.payload;
    },
    setBookToGive: (state, action) => {
      state.bookToGive = action.payload;
    }
  },
  extraReducers: {
    ...receivedReducer,
    ...sentReducer,
    ...completedRecuder,
    ...addReducer,
    ...completeReducer,
    ...rejectReducer
  }
})

export default tradeSlice;