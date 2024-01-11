import { SignInController } from '../application/controllers/signin-controller';
import { makeSignInUseCase } from './make-signin-use-case';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();

  return new SignInController(signInUseCase);
}
