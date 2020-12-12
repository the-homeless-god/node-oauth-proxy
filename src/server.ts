import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import passport from "passport";

import {
  PORT,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  SESSION_SECRET,
} from "./utils/environment";
import { SERVER_HAS_BEEN_HOSTED } from "./utils/dictionary";
import { getRouter } from "./router";

const passportSerializer = (
  user: unknown,
  fn: (error: Error, user: unknown) => void
) => fn(null, user);

const configurateApplication = (app: express.Application) => {
  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    session({
      name: SESSION_COOKIE,
      secret: SESSION_SECRET,
      cookie: {
        maxAge: parseInt(SESSION_MAX_AGE, 10),
      },
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(passportSerializer);
  passport.deserializeUser(passportSerializer);
};

const application = express();

configurateApplication(application);

application.use(getRouter());

console.info(require("express-list-endpoints")(application));

application.listen(PORT, () => {
  console.info(SERVER_HAS_BEEN_HOSTED);
});

module.exports = application;
