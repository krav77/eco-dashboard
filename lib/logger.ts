import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

const logger = pino({
  level: isProd ? 'info' : 'debug',

  transport: !isProd
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
        },
      }
    : undefined,

  base: {
    app: 'eco-dashboard',
    env: process.env.NODE_ENV ?? 'development',
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0',
  },

  timestamp: () => `,"time":"${new Date().toISOString()}"`,

  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },

  serializers: {
    err: pino.stdSerializers.err,
    req: (req) => ({
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
      },
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
});

export default logger;