// next.config.mjs
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 20;

const nextConfig = {
  // 你的其他配置
};

export default nextConfig;