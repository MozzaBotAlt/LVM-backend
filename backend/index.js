import express from "express";
import cors from "cors";
import data from "./data.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import logger from "./logger.js";

const app = express();
const PORT = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//App settings
app.set("trust proxy", 10 /* number of proxies between user and server */);
app.disable("x-powered-by"); //Disabling fingerprinting
app.use(limiter); //Apply rate limiter to all requests
app.use(helmet()); //Apply helmet
app.use(express.json()); //Parse JSON bodies
logger.info("Logger initialized");

//CORS settings
app.use(
  cors({
    origin: "*",
  })
);

//Request Handlers
app.use((request, response, next) => {
  console.log(`Client's IP: ${request.ip}`)
  logger.info(`Client's IP: ${request.ip}`)
  next();
})

app.get("/ip", (request, response) => {
  response.send(request.ip);
  logger.info(`IP endpoint accessed from IP: ${req.ip}`);
  console.log(`IP endpoint accessed from IP: ${req.ip}`);
});

app.get('/', async (req, res) => {
  try {
    const data = await someAsyncFunction();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  logger.info(`Root endpoint accessed from IP: ${req.ip}`);
  console.log(`Root endpoint accessed from IP: ${req.ip}`);
});

app.get("/date", (req, res) => {
  const currentDate = new Date(); // Get the current date and time
  const isoDateString = currentDate.toISOString(); // Convert to ISO string (e.g., "2025-10-14T14:45:00.000Z")
  
  // Send the ISO string in the response
  res.json({ date: isoDateString });

  logger.info(`Date endpoint accessed from IP: ${req.ip}`);
  console.log(`Date endpoint accessed from IP: ${req.ip}`);
});

app.get("/data", (req, res) => {
  res.json(data);
  logger.info(`Data endpoint accessed from IP: ${req.ip}`);
  console.log(`Data endpoint accessed from IP: ${req.ip}`);
});

//Port listen
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

//extra codes