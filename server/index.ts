import express from "express";
import cors from "cors";
import authRouter from "./routers/auth-router";
import { createTables } from "./dal/db-init";
import path from "path";
import { passportConfig, sessionConfig } from "./session/config";
import booksRouter from "./routers/books-router";
import usersRouter from "./routers/users-router";
import tradeRouter from "./routers/trade-router";
import errorHandler from "./middlewares/error-handler";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../build")));
app.use(express.json());
app.use(sessionConfig());
app.use(passportConfig.initialize());
app.use(passportConfig.session());
app.use(
  cors({
    credentials: true,
    origin: process.env.REACT_APP_URL || "http://localhost:3000",
  })
);

(async function () {
  await createTables();
  app.use("/auth", authRouter);
  app.use("/books", booksRouter);
  app.use("/users", usersRouter);
  app.use("/trades", tradeRouter);
  app.get("/*", (q, a) => {
    a.sendFile(path.join(__dirname, "../build", "index.html"));
  });
  app.use(errorHandler);
})();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(PORT));
