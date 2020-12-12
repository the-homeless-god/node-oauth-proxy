import { Request, Response } from "express";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({});

export const proxify = (
  request: Request,
  response: Response,
  target: string
) => {
  try {
    proxy.web(request, response, { target });
  } catch (err) {
    console.error(err);
    response.sendStatus(500);
  }
};
