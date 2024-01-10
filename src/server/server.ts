import express from 'express';

const app = express();

app.listen(3001, () => {
  console.log('\n ⚡ Server started at http://localhost:3001 \n');
});
