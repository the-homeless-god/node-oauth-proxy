import { Request, Response } from "express";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

export const proxify = (
  request: Request,
  response: Response,
  target: string
) => {
  proxy.web(request, response, { target });
};
