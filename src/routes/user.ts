import { Request, Router, Response } from "express";
import { Routers } from "./types";

export const user = (request: Request, response: Response) => {
  response.send(request.user);
};

export const initUserRoute = (router: Router) => {
  router.get(Routers.user, user);
};
