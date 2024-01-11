import { SignInUseCase } from '../application/use-cases/signin-use-case';

export function makeSignInUseCase() {
  return new SignInUseCase();
}
