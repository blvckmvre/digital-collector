import { Router } from "express";
import { passportConfig } from "../session/config";
import { body } from "express-validator";
import isAuthorized from "../middlewares/auth";
import authController from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post(
  "/signup",
  body(
    ["username", "password"],
    "Fields should be between 4 and 16 characters long"
  ).isLength({ min: 4, max: 16 }),
  body(
    ["username", "password"],
    "Fields should only contain letters and numbers"
  ).isAlphanumeric(),
  authController.signup
);
authRouter.post(
  "/login",
  passportConfig.authenticate("local"),
  authController.login
);
authRouter.post("/settings", isAuthorized, authController.changeSettings);

authRouter.get("/logout", authController.logout);
authRouter.get("/check", authController.check);


export default authRouter;
