import { PayloadAction } from "@reduxjs/toolkit";
import { completeTradeAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const completeReducer = {
  [completeTradeAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [completeTradeAction.fulfilled.type]: (
    state: TradeStateType,
    action: PayloadAction<number>
  ) => {
    state.receivedOffers = state.receivedOffers.filter(
      (offer) => offer.id !== action.payload
    );
    state.isLoading = false;
  },
  [completeTradeAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default completeReducer;
