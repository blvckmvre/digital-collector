import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local"
import { IUser } from "../../src/types/users";
import authService from "../services/auth-service";
import pgSession from "connect-pg-simple";
import { pool } from "../dal/db-init";

const PGSession = pgSession(session);

passport.use(new Strategy(async function(username, password, done) {
  try {
    const user = await authService.login(username, password);
    return done(null, user);
  } catch(e) {
    return done(e, null);
  }
}));

passport.serializeUser(async function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user as IUser);
});

const sessionStore = new PGSession({
  pool,
  tableName: "dcol_sessions",
  createTableIfMissing: true,
});

export const passportConfig = passport;
export const sessionConfig = () => session({
  secret: "dfdsfsd",
  name: "session",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 12 * 60 * 60 * 1000,
    httpOnly: false,
  },
  store: sessionStore
});