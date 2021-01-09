import Redis, {Redis as RedisClient} from 'ioredis';
import cacheConfig from '../../config/cache';

export default class RedisCache {

    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value: any): Promise<void> {

    }

    public async recover(key: string): Promise<void> {

    }

    public async invalidate(key: string): Promise<void> {

    }
}