import { Request, Response, NextFunction } from 'express'
import { getStrategies, getStrategy } from '../../strategies'

import { isUser } from '../../strategies/utils'
import { NOT_ACCESS, NOT_AUTH } from '../../utils/dictionary'
import { FULL_URL } from '../../utils/environment'
import { getAuthRoute } from '../utils'

export const isAuth = (request: Request, response: Response, next: NextFunction): void => {
  if (request.user) {
    next()
  } else {
    response.send(
      NOT_AUTH(
        getStrategies()
          .map((strategy) => `${FULL_URL}${getAuthRoute(strategy.name)}`)
          .join(', '),
      ),
    )
  }
}

export const isValid = (request: Request, response: Response, next: NextFunction): void => {
  const strategy = getStrategy(request.user.provider)

  if (isUser(request.user, strategy)) {
    next()
  } else {
    response.send(NOT_ACCESS)
  }
}
