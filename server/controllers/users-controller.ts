import { NextFunction, Request, Response } from "express";
import dbUsers from "../dal/db-users";

class UsersController {
  async getUsers(q: Request, a: Response, next: NextFunction) {
    try {
      if (q.query.id) {
        const user = await dbUsers.getUserById(+q.query.id);
        return a.json(user);
      }
      const users = await dbUsers.getUsers();
      return a.json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default new UsersController();
