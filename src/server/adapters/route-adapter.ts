import { IController } from '../../application/interfaces/controller';
import { Request, Response } from 'express';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {

    const { statusCode, body } = await controller.handle({
      body: request.body,
      params: request.params,
      accountId: request.metadata?.accountId
    });

    response.status(statusCode).json(body);
  };
}
