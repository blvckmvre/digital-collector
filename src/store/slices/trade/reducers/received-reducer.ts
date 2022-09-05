import { PayloadAction } from "@reduxjs/toolkit";
import { ITradeOffer } from "../../../../types/trade";
import { getReceivedOffersAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const receivedReducer = {
  [getReceivedOffersAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [getReceivedOffersAction.fulfilled.type]: (
    state: TradeStateType,
    action: PayloadAction<ITradeOffer[]>
  ) => {
    state.receivedOffers = action.payload;
    state.isLoading = false;
  },
  [getReceivedOffersAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default receivedReducer;
