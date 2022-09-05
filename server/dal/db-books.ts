import { pool } from "./db-init";
import { IApiBook, IBook } from "../../src/types/books";

class DBBooks {
  async getBooksByUser(user_id: number) {
    const res = await pool.query<IBook>(`
      SELECT * FROM dcol_books
      WHERE user_id=${user_id}
      ORDER BY id DESC;
    `);
    return res.rows;
  }
  async changeBookOwner(id: number, user_id: number) { 
    await pool.query(`
      UPDATE dcol_books
      SET user_id=${user_id}
      WHERE id=${id};
    `);
  }
  async addBook(book: IApiBook, user_id: number) {
    const { title, author_name } = book;
    const res = await pool.query<IBook>(`
      INSERT INTO dcol_books(user_id, title, author)
      VALUES(${user_id}, '${title}', '${author_name}')
      RETURNING *;
    `);
    return res.rows[0];
  }
  async rmBook(id: number, user_id: number) {
    const res = await pool.query<IBook>(`
      DELETE FROM dcol_books
      WHERE id='${id}'
      AND user_id=${user_id}
      RETURNING id;
    `);
    return res.rows[0].id;
  }
}

export default new DBBooks();
