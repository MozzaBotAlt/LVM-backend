import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/date', (req, res) => {
  res.sendDate(new Date());
});

app.post('/data', express.json(), (req, res) => {
  const receivedData = req.body;
  res.json({ received: receivedData });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});