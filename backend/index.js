import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: '*',
}))

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/date", (req, res) => {
  res.send(new Date().toString());
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
