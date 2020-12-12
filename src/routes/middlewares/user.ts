import { Request, Router, Response, NextFunction } from "express";
import { Google } from "../../strategies/google";
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
  // TODO: add definition of provider into type
  //@ts-ignore
  const strategy = getStrategy(request.user.provider);

  if (isUser(request.user, strategy)) {
    next();
  } else {
    response.send(NOT_ACCESS);
  }
};
