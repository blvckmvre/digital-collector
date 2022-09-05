import { Router } from "express";
import tradeController from "../controllers/trade-controller";
import isAuthorized from "../middlewares/auth";

const tradeRouter = Router();

tradeRouter.get("/received", isAuthorized, tradeController.getReceived);
tradeRouter.get("/sent", isAuthorized, tradeController.getSent);
tradeRouter.get("/completed", tradeController.getCompleted);

tradeRouter.post("/add", isAuthorized, tradeController.addOffer);
tradeRouter.post("/complete", isAuthorized, tradeController.completeOffer);
tradeRouter.post("/reject", isAuthorized, tradeController.rejectOffer);

export default tradeRouter;
