import { Request, Router, Response } from 'express'

import { Routers } from './types'

export const user = (request: Request, response: Response): void => {
  response.send(request.user)
}

export const initUserRoute = (router: Router): void => {
  router.get(Routers.user, user)
}
