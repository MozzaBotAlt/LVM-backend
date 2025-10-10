import express from 'express';
import data from './data';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/date', (req, res) => {
  res.sendDate(new Date());
});

app.post('/data', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});