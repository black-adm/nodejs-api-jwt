import express from 'express';
import cors from 'cors';

import { makeSignUpController } from '../factories/make-signup-controller';
import { makeSignInController } from '../factories/make-signin-controller';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', async (request, response) => {
  const signUpController = makeSignUpController();
  const { statusCode, body } = await signUpController.handle({
    body: request.body
  });

  response.status(statusCode).json(body);
});

app.post('/sign-in', async (request, response) => {
  const signInController = makeSignInController();
  const { statusCode, body } = await signInController.handle({
    body: request.body
  });

  response.status(statusCode).json(body);
});


app.listen(3001, () => {
  console.log('\n ⚡ Server started at http://localhost:3001 \n');
});
