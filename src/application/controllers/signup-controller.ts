import { z, ZodError } from 'zod';
import { IController, IRequest, IResponse } from '../interfaces/controller';
import { SignUpUseCase } from '../use-cases/signup-use-case';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().min(1),
  password: z.string().min(6),
});

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { name, email, password } = schema.parse(body);

      await this.signUpUseCase.execute({ name, email, password });
      return {
        statusCode: 204,
        body: null,
      };

    } catch(error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }
      throw error;
    }
  }
}
