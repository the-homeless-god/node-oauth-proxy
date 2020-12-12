import { Request, Router, Response, NextFunction } from "express";
import { Google } from "../../strategies/google";
import { isUser } from "../../strategies/utils";
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
  console.log(request.user);
  if (isUser(request.user, Google)) {
    next();
  } else {
    response.send(NOT_ACCESS);
  }
};
