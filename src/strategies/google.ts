import GooglePassport from 'passport-google-oauth'
import { getAuthCallbackRoute } from '../routes/utils'

import { getEnironmentKey } from '../utils/environment'
import { GoogleProfile, Strategies, Strategy } from './types'
import { callback, getStrategyCallbackURL } from './utils'

const profileFields: string[] = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
]

export const Google: Strategy = {
  name: Strategies.google,
  scopeContainer: {
    scope: profileFields,
  },
  getPassportStrategy: () =>
    new GooglePassport.OAuth2Strategy(
      {
        clientID: getEnironmentKey('GOOGLE_CLIENT_ID'),
        clientSecret: getEnironmentKey('GOOGLE_CLIENT_SECRET'),
        callbackURL: getStrategyCallbackURL(getAuthCallbackRoute(Strategies.google)),
        passReqToCallback: true,
        profileFields,
      },
      callback,
    ),
  parseProfileEmails: (profile: GoogleProfile): string[] =>
    profile.emails.filter((email) => email.verified).map((email) => email.value),
}

export default Google
