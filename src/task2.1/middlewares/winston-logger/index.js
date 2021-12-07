import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, printf, metadata } = format;

const winstonLogger = createLogger({
    transports: [
        new transports.Console({
            handleExceptions: true,
            format: combine(
                metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                colorize({ level: true }),
                printf(
                    (info) => {
                        return (Object.keys(info.metadata)).length
                            ? `[${info.timestamp}] ${info.level}: ${info.message} | ${JSON.stringify(info.metadata)}`
                            : `[${info.timestamp}] ${info.level}: ${info.message}`
                        ;
                    },
                )
            )
        })
    ],
    exitOnError: false
});

export default winstonLogger;
