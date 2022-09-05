import { PayloadAction } from "@reduxjs/toolkit";
import { rejectOfferAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const rejectReducer = {
  [rejectOfferAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [rejectOfferAction.fulfilled.type]: (
    state: TradeStateType,
    action: PayloadAction<number>
  ) => {
    state.receivedOffers = state.receivedOffers.filter(
      (offer) => offer.id !== action.payload
    );
    state.isLoading = false;
  },
  [rejectOfferAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default rejectReducer;
