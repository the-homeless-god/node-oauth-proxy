import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import cors from 'cors'
import getRoutes from 'express-list-endpoints'

import { PORT, SESSION_COOKIE, SESSION_MAX_AGE, SESSION_SECRET } from './utils/environment'
import { SERVER_HAS_BEEN_HOSTED } from './utils/dictionary'
import { initRouter } from './router'
import { initPassport } from './routes/middlewares/passport'

const configurateApplication = (application: Application): Application => {
  application.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  )

  application.use(bodyParser.json())
  application.use(bodyParser.urlencoded({ extended: true }))

  application.use(cookieParser())
  application.use(
    session({
      name: SESSION_COOKIE,
      secret: SESSION_SECRET,
      cookie: {
        maxAge: parseInt(SESSION_MAX_AGE, 10),
      },
      resave: true,
      saveUninitialized: true,
    }),
  )

  initPassport(application)
  initRouter(application)

  return application
}

const application = express()

configurateApplication(application).listen(PORT, (): void => {
  console.info(SERVER_HAS_BEEN_HOSTED)
  console.info(getRoutes(application))
})
