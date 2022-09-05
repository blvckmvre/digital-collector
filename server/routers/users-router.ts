import { Router } from "express";
import usersController from "../controllers/users-controller";

const usersRouter = Router();

usersRouter.get("/", usersController.getUsers);

export default usersRouter;
