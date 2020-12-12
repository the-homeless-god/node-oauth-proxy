import { PORT, TARGET } from "./environment";

export const NOT_AUTH = (url: string): string => `Navigate to ${url}`;
export const NOT_ACCESS: string = "Access denied";

export const SERVER_HAS_BEEN_HOSTED: string = `Proxy server has been hosted on ${PORT} port and will create a target to ${TARGET}`;
