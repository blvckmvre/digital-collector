import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
  static BadRequest(message: string) {
    return new AppError(400, message);
  }
  static Unauthorized() {
    return new AppError(401, "Unauthorized Access");
  }
  static Forbidden() {
    return new AppError(403, "Access Forbidden");
  }
  static NotFound() {
    return new AppError(404, "Not Found")
  }
}

export default function errorHandler(
  e: Error,
  q: Request,
  a: Response,
  next: NextFunction
) {
  if (e instanceof AppError)
    return a.status(e.status).json({ message: e.message });
  return a.status(500).json({ message: "Internal Error" });
}
