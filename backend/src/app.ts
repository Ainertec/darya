import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json('Opapapa');
});

app.listen(3333);
