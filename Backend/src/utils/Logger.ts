/*
  Used as a replacement to console.log() since that is bad practice.
  Look into external logging tools.
*/
import winston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;

const loggerFormat = format.combine(
  format.label({
    label: '[LOGGER]'
  }),
  format.timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  format.printf(
    info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  ),
  prettyPrint()
)

const loggerFormatConsole = format.combine(
  format.label({
    label: '[LOGGER]'
  }),
  format.timestamp({
    format: "DD/MM/YY HH:mm:ss",
  }),
  format.printf(
    info => `[${info.level.toUpperCase()}] ${info.timestamp} - ${info.message}`
  ),
  format.colorize({
    all: true
  }),
)

var options = {
  console: {
      handleExceptions: true,
      level: 'silly',
      format: combine(loggerFormatConsole),
  },
  verbose: {
      filename: './logs/debug/warn.log',
      level: 'warn',
      format: combine(loggerFormat)
  },
}
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
  http: 'grey'
})

const logger = winston.createLogger({
transports: [
  new transports.Console(options.console),
  new transports.File(options.verbose),
]
});

export default logger