import winston from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, json, colorize, align, printf } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), json()),
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  transports: [fileRotateTransport],
  exceptionHandlers: [fileRotateTransport],
});

export default logger;
