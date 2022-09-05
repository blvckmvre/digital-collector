import { PayloadAction } from "@reduxjs/toolkit";
import { ITradeOffer } from "../../../../types/trade";
import { getSentOffersAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const sentReducer = {
  [getSentOffersAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [getSentOffersAction.fulfilled.type]: (
    state: TradeStateType,
    action: PayloadAction<ITradeOffer[]>
  ) => {
    state.sentOffers = action.payload;
    state.isLoading = false;
  },
  [getSentOffersAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default sentReducer;
