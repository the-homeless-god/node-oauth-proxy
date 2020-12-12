import { Application } from "express";
import passport from "passport";

const passportSerializer = (
  user: unknown,
  fn: (error: Error, user: unknown) => void
) => fn(null, user);

export const initPassport = (application: Application): void => {
  application.use(passport.initialize());
  application.use(passport.session());

  passport.serializeUser(passportSerializer);
  passport.deserializeUser(passportSerializer);
};
