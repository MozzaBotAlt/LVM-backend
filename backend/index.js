import express from "express";
import cors from "cors";
import data from "./data.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//App settings
app.set("trust proxy", true);
app.disable("x-powered-by");
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

//Request Handlers
app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/date", (req, res) => {
  res.json(new Date().toUTCString());
});

app.get("/data", (req, res) => {
  res.json(data);
});

//Port listen
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
