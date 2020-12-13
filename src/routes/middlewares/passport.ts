import { Application } from 'express'
import passport from 'passport'
import { DoneFunction } from '../../strategies/types'

const passportSerializer = (user: unknown, fn: DoneFunction) => fn(null, user)

export const initPassport = (application: Application): void => {
  application.use(passport.initialize())
  application.use(passport.session())

  passport.serializeUser(passportSerializer)
  passport.deserializeUser(passportSerializer)
}
