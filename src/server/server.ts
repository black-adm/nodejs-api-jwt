import express from 'express';
import cors from 'cors';

import { makeSignUpController } from '../factories/make-signup-controller';
import { makeSignInController } from '../factories/make-signin-controller';
import { routeAdapter } from './adapters/route-adapter';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', routeAdapter(makeSignUpController()));

app.post('/sign-in', routeAdapter(makeSignInController()));

app.listen(3001, () => {
  console.log('\n ⚡ Server started at http://localhost:3001 \n');
});
