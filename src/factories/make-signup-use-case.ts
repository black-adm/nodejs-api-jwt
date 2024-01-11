import { SignUpUseCase } from '../application/use-cases/signup-use-case';

export function makeSignUpUseCase() {
  const SALT = 12;

  return new SignUpUseCase(SALT);
}
