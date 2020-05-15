import getRedisOptions from './getRedisOptions';

// Set up the mocked cache service.
describe('cacheService', () => {
  beforeEach(() => {
    process.env.REDIS_URL = '';
    process.env.REDIS_MASTER = '';
  });

  it('should allow usage of REDIS_URL env var', () => {
    process.env.REDIS_URL = '127.0.0.1:6379'; // This is not a real redis host.
    const [host] = getRedisOptions();

    expect(host).toBe('127.0.0.1');
  });

  it('should allow usage of REDIS_MASTER env var', () => {
    process.env.REDIS_MASTER = '127.0.0.1:6379';
    const [host] = getRedisOptions();

    expect(host).toBe('127.0.0.1');
  });

  it('should match host IP and port', () => {
    process.env.REDIS_MASTER = '127.0.0.1:6379';
    const [host, port] = getRedisOptions();

    expect(host).toBe('127.0.0.1');
    expect(port).toBe('6379');
  });

  it('should match host with redis protocol', () => {
    process.env.REDIS_MASTER = 'redis://h:pf11eaf6aa741db6178b99@ec2-3-211.compute-1.amazonaws.com:11839'; // This is not a real redis host.
    const [host, port] = getRedisOptions();

    expect(host).toBe('redis://h:pf11eaf6aa741db6178b99@ec2-3-211.compute-1.amazonaws.com');
    expect(port).toBe('11839');
  });
});
