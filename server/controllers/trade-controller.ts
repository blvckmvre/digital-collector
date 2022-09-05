import { NextFunction, Request, Response } from "express";
import { IBook } from "../../src/types/books";
import { IDBUser, IUser } from "../../src/types/users";
import dbTrades from "../dal/db-trades";
import tradeService from "../services/trade-service";

class TradeController {
  async getReceived(q: Request, a: Response, next: NextFunction) {
    try {
      const { username } = q.user as IDBUser;
      const offers = await dbTrades.getReceivedOffers(username);
      return a.json(offers);
    } catch (e) {
      next(e);
    }
  }
  async getSent(q: Request, a: Response, next: NextFunction) {
    try {
      const { username } = q.user as IDBUser;
      const offers = await dbTrades.getSentOffers(username);
      return a.json(offers);
    } catch (e) {
      next(e);
    }
  }
  async getCompleted(q: Request, a: Response, next: NextFunction) {
    try {
      const trades = await dbTrades.getCompletedTrades();
      return a.json(trades);
    } catch (e) {
      next(e);
    }
  }
  async addOffer(q: Request, a: Response, next: NextFunction) {
    try {
      const {
        partner,
        gets,
        gives,
      }: { partner: IUser; gives: IBook; gets: IBook } = q.body;
      const { username, id } = q.user as IDBUser;
      const addedOffer = await tradeService.createOffer(
        id,
        username,
        partner,
        gets,
        gives
      );
      return a.json(addedOffer);
    } catch (e) {
      next(e);
    }
  }
  async completeOffer(q: Request, a: Response, next: NextFunction) {
    try {
      const { id }: { id: number } = q.body;
      const { id: user_id } = q.user as IDBUser;
      await tradeService.performTradeOperation(id, user_id);
      return a.json(id);
    } catch (e) {
      next(e);
    }
  }
  async rejectOffer(q: Request, a: Response, next: NextFunction) {
    try {
      const { id }: { id: number } = q.body;
      const { id: user_id } = q.user as IDBUser;
      const removedOfferId = await tradeService.rejectOffer(id, user_id);
      return a.json(removedOfferId);
    } catch (e) {
      next(e);
    }
  }
}

export default new TradeController();
