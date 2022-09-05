import { Pool } from "pg";
import { config } from "dotenv";
config();

export const pool = new Pool({
  connectionString: process.env.POSTGRES,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dcol_users(
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        displayname TEXT,
        location TEXT
      );
      CREATE TABLE IF NOT EXISTS dcol_books(
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES dcol_users(id)
      );
      CREATE TABLE IF NOT EXISTS dcol_offers(
        id SERIAL PRIMARY KEY,
        creator_name TEXT REFERENCES dcol_users(username) NOT NULL,
        creator_id INTEGER REFERENCES dcol_users(id) NOT NULL,
        partner_name TEXT REFERENCES dcol_users(username) NOT NULL,
        partner_id INTEGER REFERENCES dcol_users(id) NOT NULL,
        gives_title TEXT NOT NULL,
        gives_id INTEGER NOT NULL,
        gets_title TEXT NOT NULL,
        gets_id INTEGER NOT NULL,
        completed BOOLEAN NOT NULL
      );
    `);
    console.log("tables created");
  } catch(e) {
    throw e;
  }
}
