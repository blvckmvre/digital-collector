import { PayloadAction } from "@reduxjs/toolkit";
import { addOfferAction } from "../../../actions/trade-actions";
import { TradeStateType } from "../trade-slice";

const addReducer = {
  [addOfferAction.pending.type]: (state: TradeStateType) => {
    state.isLoading = true;
    state.error = null;
  },
  [addOfferAction.fulfilled.type]: (state: TradeStateType) => {
    state.isLoading = false;
  },
  [addOfferAction.rejected.type]: (
    state: TradeStateType,
    action: PayloadAction<string>
  ) => {
    state.error = action.payload;
    state.isLoading = false;
  },
};

export default addReducer;
