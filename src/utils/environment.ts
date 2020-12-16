import dotenv from 'dotenv'

dotenv.config()

export const getEnironmentKey = (name: string): string => {
  const env = process.env[name]

  if (env) {
    return env
  }

  const error = new Error(`${name} is not defined at .env file`)
  console.error(error)

  throw error
}

const tryGetEnvironmentKey = (name: string): string | undefined => {
  try {
    const value = getEnironmentKey(name)
    return value
  } catch {
    return undefined
  }
}

const parseConfigUsers = (config: string): string[] => config.split(';')

const getEnvironmentUsers = (key: string): string[] => {
  const value = tryGetEnvironmentKey(key)
  if (value) {
    return parseConfigUsers(value)
  }

  return []
}

export const allowedUsers: string[] = getEnvironmentUsers('ALLOWED_USERS')
export const blockedUsers: string[] = getEnvironmentUsers('BLOCKED_USERS')

export const URL: string = getEnironmentKey('URL')
export const PORT: string = getEnironmentKey('PORT')
export const FULL_URL = `${URL}:${PORT}`

export const SESSION_COOKIE: string = getEnironmentKey('SESSION_COOKIE')
export const SESSION_MAX_AGE: string = getEnironmentKey('SESSION_MAX_AGE')
export const SESSION_SECRET: string = getEnironmentKey('SESSION_SECRET')

export const TARGET: string = getEnironmentKey('TARGET')
