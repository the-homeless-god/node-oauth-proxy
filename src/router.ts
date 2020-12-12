import express, { Application, Router } from "express";
import passport from "passport";

import { initLoginCallbackRoute, initLoginRoute } from "./routes/login";
import { initLogoutRoute } from "./routes/logout";
import { initRootRoute } from "./routes/root";
import { initUserRoute } from "./routes/user";
import { getStrategies } from "./strategies";

export const getRouter = (): Router => {
  const router = express.Router();

  initLogoutRoute(router);
  initUserRoute(router);

  getStrategies().forEach((strategy) => {
    passport.use(strategy.getPassportStrategy());

    initLoginRoute(router, strategy);
    initLoginCallbackRoute(router, strategy);
  });

  return router;
};

export const initRouter = (application: Application): void => {
  const router = getRouter();

  application.use(router);
  initRootRoute(application);
};
