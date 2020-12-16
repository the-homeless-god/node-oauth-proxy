import { Google } from './google'
import { Strategies, Strategy } from './types'

export const getStrategies = (): Strategy[] => [Google]

export const getStrategy = (name: string | Strategies): Strategy =>
  getStrategies().find((strategy) => strategy.name === name)
