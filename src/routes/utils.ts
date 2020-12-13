import { Routers } from './types'

export const getAuthCallbackRoute = (name: string): string => `${Routers.auth}/${name}/callback`

export const getAuthRoute = (name: string): string => `${Routers.auth}/${name}`
