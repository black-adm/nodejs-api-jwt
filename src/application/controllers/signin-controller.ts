import { z, ZodError } from 'zod';
import { IController, IRequest, IResponse } from '../interfaces/controller';
import { SignInUseCase } from '../use-cases/signin-use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';

const schema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(body);
      const { accessToken } = await this.signInUseCase.execute({ email, password });

      return {
        statusCode: 200,
        body: { accessToken },
      };

    } catch(error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentialsError) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials!'
          }
        };
      }

      throw error;
    }
  }
}
