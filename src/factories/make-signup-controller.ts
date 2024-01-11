import { SignUpController } from '../application/controllers/signup-controller';
import { makeSignUpUseCase } from './make-signup-use-case';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();

  return new SignUpController(signUpUseCase);
}
