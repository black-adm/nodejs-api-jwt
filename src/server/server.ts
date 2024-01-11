import express from 'express';
import cors from 'cors';

import { makeSignUpUseCase } from '../factories/make-signup-use-case';
import { SignUpController } from '../application/controllers/signup-controller';
import { SignInUseCase } from '../application/use-cases/signin-use-case';
import { SignInController } from '../application/controllers/signin-controller';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', async (request, response) => {
  const signUpUseCase = makeSignUpUseCase();
  const signUpController = new SignUpController(signUpUseCase);
  const { statusCode, body } = await signUpController.handle({
    body: request.body
  });

  response.status(statusCode).json(body);
});

app.post('/sign-in', async (request, response) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInController(signInUseCase);
  const { statusCode, body } = await signInController.handle({
    body: request.body
  });

  response.status(statusCode).json(body);
});


app.listen(3001, () => {
  console.log('\n ⚡ Server started at http://localhost:3001 \n');
});
