import express from 'express';
import data from './data.js';

const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/date', (req, res) => {
  res.send(new Date().toString());
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});