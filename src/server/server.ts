import express from 'express';
import cors from 'cors';

import { routeAdapter } from './adapters/route-adapter';
import { makeSignUpController } from '../factories/make-signup-controller';
import { makeSignInController } from '../factories/make-signin-controller';
import { makeListLeadsController } from '../factories/make-list-leads-controller';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', routeAdapter(makeSignUpController()));
app.post('/sign-in', routeAdapter(makeSignInController()));

app.get('/leads', routeAdapter(makeListLeadsController()));

app.listen(3001, () => {
  console.log('\n ⚡ Server started at http://localhost:3001 \n');
});
