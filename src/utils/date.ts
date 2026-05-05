import { format } from 'winston';

export const loggerDateFormat = format.printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp as Date);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});
