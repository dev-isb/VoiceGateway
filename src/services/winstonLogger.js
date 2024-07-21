const main = () => {
    const winston = require("winston");

    let alignColorsAndTime = winston.format.combine(
        winston.format.colorize({
            all: true,
        }),
        winston.format.label({
            label: "[LOGGER]",
        }),
        winston.format.timestamp({
            format: "YY-MM-DD HH:mm:ss",
        }),
        winston.format.printf(
            (info) =>
                ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
        )
    );
    const logger = winston.createLogger({
        level: "debug",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    alignColorsAndTime
                ),
            }),
        ],
    });

    console.winstonLogger = logger;
};

module.exports = main();
