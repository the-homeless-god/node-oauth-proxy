import { PORT, TARGET } from './environment'

export const NOT_AUTH = (url: string): string => `Navigate to ${url}`
export const NOT_ACCESS = 'Access denied'

export const SERVER_HAS_BEEN_HOSTED = `Proxy server has been hosted on ${PORT} with target to ${TARGET}`
