import { pool } from "./db-init";
import { IOffer, ITradeOffer } from "../../src/types/trade";

class DBTrades {
  async getOfferById(id: number) {
    const res = await pool.query<ITradeOffer>(`
      SELECT * FROM dcol_offers
      WHERE id=${id};
    `);
    return res.rows[0];
  }
  async getReceivedOffers(username: string) {
    const res = await pool.query<ITradeOffer>(`
      SELECT * FROM dcol_offers
      WHERE partner_name='${username}'
      AND completed=false
      ORDER BY id DESC;
    `);
    return res.rows;
  }
  async getSentOffers(username: string) {
    const res = await pool.query<ITradeOffer>(`
      SELECT * FROM dcol_offers
      WHERE creator_name='${username}'
      AND completed=false
      ORDER BY id DESC;
    `);
    return res.rows;
  }
  async getCompletedTrades() {
    const res = await pool.query<ITradeOffer>(`
      SELECT * FROM dcol_offers
      WHERE completed=true
      ORDER BY id DESC;
    `);
    return res.rows;
  }
  async completeTrade(id: number, user_id: number) {
    const res = await pool.query<ITradeOffer>(`
      UPDATE dcol_offers
      SET completed=true
      WHERE id=${id}
      AND partner_id=${user_id}
      AND completed=false
      RETURNING *;
    `);
    return res.rows[0];
  }
  async addOffer(offer: IOffer) {
    const {
      creator_name,
      creator_id,
      gets_id,
      gets_title,
      gives_id,
      gives_title,
      partner_name,
      partner_id
    } = offer;
    const res = await pool.query<ITradeOffer>(`
      INSERT INTO dcol_offers(
        creator_name, 
        creator_id,
        partner_name, 
        partner_id,
        gives_title, 
        gives_id, 
        gets_title, 
        gets_id, 
        completed
      ) VALUES(
        '${creator_name}', 
        '${creator_id}', 
        '${partner_name}', 
        '${partner_id}',
        '${gives_title}', 
        '${gives_id}', 
        '${gets_title}', 
        '${gets_id}', 
        false
      ) RETURNING *;
    `);
    return res.rows[0];
  }
  async clearOffer(id: number, user_id: number) {
    const res = await pool.query<{id: number}>(`
      DELETE FROM dcol_offers
      WHERE id=${id}
      AND partner_id=${user_id}
      AND completed=false
      RETURNING id;
    `);
    return res.rows[0].id;
  }
}


export default new DBTrades();
