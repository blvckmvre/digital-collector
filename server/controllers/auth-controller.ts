import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IDBUser } from "../../src/types/users";
import dbUsers from "../dal/db-users";
import { AppError } from "../middlewares/error-handler";
import authService from "../services/auth-service";

class AuthController {
  async signup(q: Request, a: Response, next: NextFunction) {
    try {
      const errors = validationResult(q);
      if (!errors.isEmpty()) return next(AppError.BadRequest(errors.array()[0].msg));
      const { username, password } = q.body;
      await authService.signup(username, password);
      return a.json({ result: "good" });
    } catch (e) {
      next(e);
    }
  }
  async login(q: Request, a: Response) {
    return a.json(q.user);
  }
  async logout(q: Request, a: Response, next: NextFunction) {
    q.logout(function (e) {
      if (e) return next(e);
      return a.json({ result: "good" });
    });
  }
  async check(q: Request, a: Response, next: NextFunction) {
    try {
      if (!q.isAuthenticated()) return next(AppError.Unauthorized());
      const { id } = q.user as IDBUser;
      const user = await dbUsers.getUserById(id);
      return a.json(user);
    } catch (e) {
      next(e);
    }
  }
  async changeSettings(q: Request, a: Response, next: NextFunction) {
    try {
      const {
        displayname,
        location,
      }: { displayname: string; location: string } = q.body;
      const { id } = q.user as IDBUser;
      const updatedUser = await dbUsers.changeSettings(
        id,
        displayname,
        location
      );
      return a.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
