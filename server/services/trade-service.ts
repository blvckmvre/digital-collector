import { IBook } from "../../src/types/books";
import { IOffer } from "../../src/types/trade";
import { IUser } from "../../src/types/users";
import dbBooks from "../dal/db-books";
import dbTrades from "../dal/db-trades";
import { AppError } from "../middlewares/error-handler";

class TradeService {
  async createOffer(
    creator_id: number,
    creator_name: string,
    partner: IUser,
    gets: IBook,
    gives: IBook
  ) {
    if (creator_id === partner.id)
      throw AppError.BadRequest("You cannot make offers to yourself");
    const offer: IOffer = {
      creator_id,
      creator_name,
      partner_id: partner.id,
      partner_name: partner.username,
      gets_id: gets.id,
      gets_title: gets.title,
      gives_id: gives.id,
      gives_title: gives.title,
    };
    const addedOffer = await dbTrades.addOffer(offer);
    return addedOffer;
  }
  async performTradeOperation(id: number, user_id: number) {
    const completedTrade = await dbTrades.completeTrade(id, user_id);
    await dbBooks.changeBookOwner(
      completedTrade.gets_id,
      completedTrade.creator_id
    );
    await dbBooks.changeBookOwner(
      completedTrade.gives_id,
      completedTrade.partner_id
    );
  }
  async rejectOffer(id: number, user_id: number) {
    const removedOfferId = await dbTrades.clearOffer(id, user_id);
    if (!removedOfferId) throw AppError.BadRequest("Offer does not exist");
    return removedOfferId;
  }
}

export default new TradeService();
