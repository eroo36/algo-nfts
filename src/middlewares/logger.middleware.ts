import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const start = process.hrtime();
    Logger.log(`${req.method} ${req.originalUrl} called`);
    const { ip, method, path: url } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('close', () => {
      const durationInMilliseconds = this.getDurationInMilliseconds(start);
      const { statusCode, statusMessage } = res;
      !statusCode.toString().startsWith('2')
        ? Logger.warn(
            `${method} ${url} ${statusCode} ${statusMessage} - ${userAgent} ${durationInMilliseconds.toFixed(
              3,
            )}ms ${ip} `,
          )
        : Logger.log(
            `${method} ${url} ${statusCode} - ${userAgent} ${durationInMilliseconds.toFixed(
              3,
            )}ms ${ip} `,
          );
    });
    next();
  }

  getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };
}
