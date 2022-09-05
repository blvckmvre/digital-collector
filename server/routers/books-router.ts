import { Router } from "express";
import booksController from "../controllers/books-controller";
import isAuthorized from "../middlewares/auth";

const booksRouter = Router();

booksRouter.get("/", booksController.getBooks);

booksRouter.post("/add", isAuthorized, booksController.addBook);
booksRouter.post("/rm", isAuthorized, booksController.rmBook);

export default booksRouter;
