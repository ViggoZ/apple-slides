// 使用 import 语法引入 events 模块
import { EventEmitter } from 'events';

// 设置默认最大监听器数量
EventEmitter.defaultMaxListeners = 20;

// 导出 Next.js 配置
const nextConfig = {
  // 你的其他配置
};

export default nextConfig;