import { Request } from 'express'

import { allowedDomains, allowedUsers, blockedUsers, PUBLIC_URL } from '../utils/environment'
import { DoneFunction, EmailConfiguration, Strategy } from './types'

export const getStrategyCallbackURL = (path: string): string => `${PUBLIC_URL}${path}`

export const callback = (
  _request: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: unknown,
  done: DoneFunction,
): void => done(null, profile)

export const isValidDomain = (domain: string, email: string): boolean => {
  if (domain.length === 0) {
    return false
  }

  const pattern = `^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(${domain})$`
  const regexp = new RegExp(pattern)

  return regexp.test(email)
}

export const isSomeDomainEmail = (emails: string[], domains: string[]): boolean =>
  Boolean(emails.find((email) => domains.find((domain) => isValidDomain(domain, email))))

export const isUserEmail = (emails: string[], users: string[]): boolean =>
  Boolean(emails.find((email) => users.includes(email)))

export const isSomeEmailValid = (emails: string[], config: EmailConfiguration): boolean => {
  if (emails.length === 0) {
    return false
  }

  if (isUserEmail(emails, config.blockedUsers)) {
    return false
  }

  if (config.allowedUsers.length > 0 && isUserEmail(emails, config.allowedUsers)) {
    return true
  }

  if (isSomeDomainEmail(emails, config.allowedDomains)) {
    return true
  }

  if (config.allowedUsers.length === 0) {
    return true
  }

  return false
}
export const isUser = (user: unknown, strategy: Strategy): boolean => {
  const emails = strategy.parseProfileEmails(user)

  return isSomeEmailValid(emails, { allowedUsers, allowedDomains, blockedUsers })
}
