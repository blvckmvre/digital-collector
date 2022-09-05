import { NextFunction, Request, Response } from "express";
import { IApiBook } from "../../src/types/books";
import { IDBUser } from "../../src/types/users";
import dbBooks from "../dal/db-books";
import { AppError } from "../middlewares/error-handler";

class BooksController {
  async getBooks(q: Request, a: Response, next: NextFunction) {
    try {
      if (q.query.user_id) {
        const books = await dbBooks.getBooksByUser(+q.query.user_id!);
        return a.json(books);
      }
      const { id } = q.user as IDBUser;
      const books = await dbBooks.getBooksByUser(id);
      return a.json(books);
    } catch (e) {
      next(e);
    }
  }
  async addBook(q: Request, a: Response, next: NextFunction) {
    try {
      const { book }: { book: IApiBook } = q.body;
      const { id } = q.user as IDBUser;
      const addedBook = await dbBooks.addBook(book, id);
      return a.json(addedBook);
    } catch (e) {
      next(e);
    }
  }
  async rmBook(q: Request, a: Response, next: NextFunction) {
    try {
      const { id: user_id } = q.user as IDBUser;
      const { id }: { id: number } = q.body;
      const removedBookId = await dbBooks.rmBook(id, user_id);
      if (!removedBookId) return next(AppError.BadRequest("Book does not exist"));
      return a.json(removedBookId);
    } catch (e) {
      next(e);
    }
  }
}

export default new BooksController();
