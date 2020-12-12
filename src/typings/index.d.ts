declare namespace Express {
  export interface Request {
    user?: { provider?: string };
  }
}
