// importing the necessary modules
const winston = require("winston");
const expressWinston = require("express-winston");

// create the custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { level, message, timestamp } = info;

    const meta = info.meta || info.metadata || {};
    const stack =
    meta?.error?.stack ||
    meta?.stack ||
    info?.error?.stack ||
    info?.stack;


    return `${timestamp} ${level}: ${stack || message}`;
  })
);

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: "error.log" })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
