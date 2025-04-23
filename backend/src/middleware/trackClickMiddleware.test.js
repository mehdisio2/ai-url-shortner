jest.mock('../config/redis.js'); // Mocks the import

import trackClickMiddleware from './trackClickMiddleware.js'
import {redis} from '../config/redis.js';

describe('trackClickMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        'x-forwarded-for': '123.45.67.89',
        'user-agent': 'Mozilla/5.0',
        'referrer': 'https://google.com',
      },
      params: {
        id: 'abc123',
      },
      socket: { remoteAddress: '127.0.0.1' },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
    redis.xAdd.mockClear();
  });

  it('should add a log to Redis stream and call next()', async () => {
    await trackClickMiddleware(req, res, next);

    expect(redis.xAdd).toHaveBeenCalledWith(
      'logsStream',
      '*',
      expect.objectContaining({
        ip: '123.45.67.89',
        User_Agent: 'Mozilla/5.0',
        timestamp: expect.any(String),
        referrer: 'https://google.com',
        short_url_id: 'abc123',
        geo: null,
      })
    );

    expect(next).toHaveBeenCalled();
  });

  it('should handle Redis error and send 500', async () => {
    redis.xAdd.mockRejectedValueOnce(new Error('Redis down'));

    await trackClickMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal server error');
    expect(next).not.toHaveBeenCalled();
  });
});
