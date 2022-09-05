import { PayloadAction } from "@reduxjs/toolkit";
import { ITradeOffer } from "../../../../types/trade";
import { getCompletedTradesAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const completedRecuder = {
  [getCompletedTradesAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [getCompletedTradesAction.fulfilled.type]: (
    state: TradeStateType,
    action: PayloadAction<ITradeOffer[]>
  ) => {
    state.completedTrades = action.payload;
    state.isLoading = false;
  },
  [getCompletedTradesAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default completedRecuder;
