import express from "express";
import cors from "cors";
import data from "./data.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.get("/", (req, res) => {
  res.sendStatus("Status: ", 200);
});

app.get("/date", (req, res) => {
  res.json(new Date().toUTCString());
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
