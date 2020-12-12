import { Request } from "express";

import { allowedUsers, blockedUsers, PORT, URL } from "../utils/environment";
import { Strategy } from "./types";

export const getStrategyCallbackURL = (path: string): string =>
  `${URL}:${PORT}/${path}`;

export const callback = (
  _request: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: unknown,
  done: (error: Error, profile: unknown) => void
) => done(null, profile);

export const isUser = (user: unknown, strategy: Strategy) => {
  const emails = strategy.parseProfileEmails(user);

  const isBlockedUser = emails.find((email) => blockedUsers.includes(email));
  if (isBlockedUser) {
    return false;
  }

  const isAllowedUser = emails.find((email) => allowedUsers.includes(email));
  return isAllowedUser;
};
