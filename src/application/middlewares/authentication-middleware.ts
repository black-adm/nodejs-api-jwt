import { environment } from '../config/env';
import { IMiddleware, IRequest, IResponse, IData } from '../interfaces/middleware';
import { verify } from 'jsonwebtoken';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token!'
        },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');
      if (bearer !== 'Bearer') throw new Error();

      const payload = verify(token, environment.jwtSecret);

      return {
        data: { accountId: payload.sub }
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token!'
        },
      };
    }

  }
}
