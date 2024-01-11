import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../../application/interfaces/middleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {

    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
    });

    if ('statusCode' in result) return response.status(result.statusCode).json(result.body);

    result.data;
    next();
  };
}