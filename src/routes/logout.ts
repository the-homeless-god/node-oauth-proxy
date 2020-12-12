import { Request, Router, Response } from "express";

import { NOT_AUTH } from "../utils/dictionary";
import { SESSION_COOKIE } from "../utils/environment";
import { Routers } from "./types";

export const logout = (request: Request, response: Response) => {
  if (request.session) {
    request.session.destroy((error: Error) => {
      if (error) {
        response.send(NOT_AUTH);
      } else {
        response.clearCookie(SESSION_COOKIE);
        response.redirect(Routers.root);
      }
    });
  }
};

export const initLogoutRoute = (router: Router) => {
  router.get(Routers.logout, logout);
};
