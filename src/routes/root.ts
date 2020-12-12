import { Request, Router, Response } from "express";

import { TARGET } from "../utils/environment";
import { proxify } from "../utils/proxy";
import { isAuth, isValid } from "./middlewares/user";
import { Routers } from "./types";

export const root = (request: Request, response: Response) =>
  proxify(request, response, TARGET);

export const initRootRoute = (router: Router) => {
  router.get(Routers.root, isAuth, isValid, root);
};
