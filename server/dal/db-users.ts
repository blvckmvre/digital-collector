import { pool } from "./db-init";
import { IDBUser, IUser } from "../../src/types/users";

class DBUsers {
  async getUsers() {
    const res = await pool.query<IUser>(`
      SELECT id, username, displayname, location FROM dcol_users;
    `);
    return res.rows;
  }
  async getUserWithCredentials(username: string) {
    const res = await pool.query<IDBUser>(`
      SELECT * FROM dcol_users
      WHERE username='${username}';
    `);
    return res.rows[0];
  }
  async getUserById(id: number) {
    const res = await pool.query<IUser>(`
      SELECT id, username, displayname, location FROM dcol_users
      WHERE id=${id};
    `);
    return res.rows[0];
  }
  async getUserByName(username: string) {
    const res = await pool.query<IUser>(`
      SELECT id, username, displayname, location FROM dcol_users
      WHERE username='${username}';
    `);
    return res.rows[0];
  }
  async addUser(username: string, password: string) {
    const res = await pool.query<{ id: number }>(`
      INSERT INTO dcol_users(username, password)
      VALUES('${username}', '${password}')
      RETURNING id;
    `);
    return res.rows[0].id;
  }
  async changeSettings(id: number, displayname: string, location: string) {
    const res = await pool.query<IUser>(`
      UPDATE dcol_users
      SET displayname='${displayname}',
      location='${location}'
      WHERE id=${id}
      RETURNING id, username, displayname, location;
    `);
    return res.rows[0];
  }
}

export default new DBUsers();
