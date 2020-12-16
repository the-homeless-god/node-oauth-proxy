import { Request } from 'express'

import { allowedUsers, blockedUsers, PORT, URL } from '../utils/environment'
import { DoneFunction, Strategy } from './types'

export const getStrategyCallbackURL = (path: string): string => `${URL}:${PORT}${path}`

export const callback = (
  _request: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: unknown,
  done: DoneFunction,
): void => done(null, profile)

export const isUser = (user: unknown, strategy: Strategy): boolean => {
  const emails = strategy.parseProfileEmails(user)

  const isBlockedUser = emails.find((email) => blockedUsers.includes(email))
  if (isBlockedUser) {
    return false
  }

  if (allowedUsers.length > 0) {
    const isAllowedUser = emails.find((email) => allowedUsers.includes(email))
    return Boolean(isAllowedUser)
  }

  return true
}
