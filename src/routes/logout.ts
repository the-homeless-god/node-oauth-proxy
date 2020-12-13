import { Request, Router, Response } from 'express'

import { SESSION_COOKIE } from '../utils/environment'
import { Routers } from './types'

export const logout = (request: Request, response: Response): void => {
  if (request.session) {
    request.session.destroy((error: Error) => {
      if (error) {
        response.sendStatus(500)
      } else {
        response.clearCookie(SESSION_COOKIE)
        response.redirect(Routers.root)
      }
    })
  }
}

export const initLogoutRoute = (router: Router): void => {
  router.get(Routers.logout, logout)
}
