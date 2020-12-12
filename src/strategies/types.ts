import { Strategy as PassportStrategy } from "passport";

export interface GoogleProfile {
  emails?: { verified: boolean; value: string }[];
}

export interface Strategy {
  name: string | Strategies;
  scopeContainer: {
    scope: string[];
  };
  getPassportStrategy: () => PassportStrategy;
  parseProfileEmails: (profile: GoogleProfile) => string[];
}

export enum Strategies {
  google = "google",
}
