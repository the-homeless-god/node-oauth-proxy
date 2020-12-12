import { Request, Router, Response, NextFunction } from "express";

import { getStrategy, isUser } from "../../strategies/utils";
import { NOT_ACCESS } from "../../utils/dictionary";

export const isAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.user) {
    next();
  } else {
    response.sendStatus(401);
  }
};

export const isValid = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const strategy = getStrategy(request.user.provider);

  if (isUser(request.user, strategy)) {
    next();
  } else {
    response.send(NOT_ACCESS);
  }
};
