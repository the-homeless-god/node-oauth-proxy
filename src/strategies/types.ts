import { Strategy as PassportStrategy } from 'passport'

export interface GoogleProfile {
  emails?: { verified: boolean; value: string }[]
}

export enum Strategies {
  google = 'google',
}

export interface Strategy {
  name: string | Strategies
  scopeContainer: {
    scope: string[]
  }
  getPassportStrategy: () => PassportStrategy
  parseProfileEmails: (profile: GoogleProfile) => string[]
}

export type DoneFunction = (error: Error, data: unknown) => void

export interface EmailConfiguration {
  allowedDomains: string[]
  allowedUsers: string[]
  blockedUsers: string[]
}
