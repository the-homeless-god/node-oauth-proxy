import express, { Application, Router } from "express";
import passport from "passport";

import { initLoginCallbackRoute, initLoginRoute } from "./routes/login";
import { initLogoutRoute } from "./routes/logout";
import { initRootRoute } from "./routes/root";
import { initUserRoute } from "./routes/user";
import { getSrategies } from "./strategies";

export const getRouter = (application: Application): Router => {
  const router = express.Router();

  initLogoutRoute(router);
  initUserRoute(router);

  getSrategies().forEach((strategy) => {
    passport.use(strategy.getPassportStrategy());

    initLoginRoute(router, strategy);
    initLoginCallbackRoute(router, strategy);
  });

  return router;
};

export const initRouter = (application: Application) => {
  const router = getRouter(application);

  application.use(router);
  initRootRoute(application);
};
