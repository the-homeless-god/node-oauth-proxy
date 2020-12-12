import { Google } from "./google";
import { Strategy } from "./types";

export const getStrategies = (): Strategy[] => [Google, Google];
