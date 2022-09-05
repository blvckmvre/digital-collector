import { NextFunction, Request, Response } from "express";
import { AppError } from "./error-handler";

export default function isAuthorized(q: Request, a: Response, next: NextFunction) {
  if(q.isUnauthenticated()) return next(AppError.Unauthorized());
  return next();
}