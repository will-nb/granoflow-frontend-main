# 地理封锁功能实现说明

## 概述

已成功实现前端地理封锁功能，当检测到访问者来自中国大陆（CN）时，会显示全屏模态框并重定向到中国官网。

## 实现的功能

### 1. Cloudflare Worker（`workers/geo-country.js`）
- 使用 Cloudflare 的 `request.cf.country` 检测访问者国家代码
- 返回 JSON 格式：`{ "country": "CN" }`
- 支持 CORS，允许前端跨域请求
- 错误处理：检测失败时返回 `UNKNOWN`，不会阻止访问

### 2. 地理封锁模态框组件（`src/components/GeoBlockModal.tsx`）
- 全屏模态框，覆盖整个视口
- 半透明深色背景，禁用背景滚动
- 中英文双语提示文本
- 单个确认按钮，点击后重定向到中国官网
- 使用 motion/react 实现平滑动画效果
- 高 z-index (9999)，确保在最上层

### 3. 地理检测工具函数（`src/utils/geoBlock.ts`）
- `detectCountry()`: 调用 Worker 端点检测国家代码
- `isCountryBlocked()`: 检查国家是否在封锁列表中
- `redirectToChinaSite()`: 重定向到中国官网
- 5秒超时保护，失败时优雅降级（不阻止访问）

### 4. 主应用集成（`src/App.tsx`）
- 在组件加载时自动检测国家
- 如果检测到被封锁的国家，显示模态框
- 模态框显示时禁用页面滚动和交互

## 配置说明

### 修改封锁国家列表

编辑 `src/utils/geoBlock.ts`：

```typescript
// 添加更多国家代码（ISO 3166-1 alpha-2）
export const BLOCKED_COUNTRIES = ['CN', 'XX'] as const;
```

### 修改中国官网 URL

编辑 `src/utils/geoBlock.ts`：

```typescript
export const CHINA_SITE_URL = 'https://granoflow.cn';
```

### 配置 Geo 检测端点

编辑 `src/utils/geoBlock.ts`：

**方式 1（推荐，无需配置路由）**：直接使用 Worker 的默认 URL
```typescript
// 部署 Worker 后，Cloudflare 会自动分配一个 URL，直接复制到这里
export const GEO_ENDPOINT = 'https://granoflow-geo-country.xxx.workers.dev';
```

**方式 2（可选）**：如果网站也在 Cloudflare 上，可以配置路由使用相对路径
```typescript
// 需要先在 Cloudflare Dashboard 配置路由（如 yourdomain.com/geo）
export const GEO_ENDPOINT = '/geo';
```

## 部署步骤

### 1. 部署 Cloudflare Worker

参考 `workers/README.md` 中的详细说明：

```bash
cd workers
npm install -g wrangler  # 如果还没有安装
wrangler login
wrangler deploy
```

部署成功后，Wrangler 会显示 Worker 的 URL，格式类似：
`https://granoflow-geo-country.xxx.workers.dev`

### 2. 更新前端配置（无需配置路由）

编辑 `src/utils/geoBlock.ts`，将 `GEO_ENDPOINT` 改为 Worker 的完整 URL：

```typescript
export const GEO_ENDPOINT = 'https://granoflow-geo-country.xxx.workers.dev';
```

**注意**：如果你想让 Worker 在你的主域名下运行（如 `yourdomain.com/geo`），才需要配置路由。否则直接使用 Worker 的默认 URL 即可，无需任何额外配置。

### 4. 构建和部署前端

```bash
npm run build
# 然后按照你的部署流程部署 dist 目录
```

## 工作原理

1. **页面加载时**：React 组件在 `useEffect` 中调用 `detectCountry()`
2. **检测国家**：前端向 Cloudflare Worker 发送 GET 请求
3. **判断封锁**：如果返回的国家代码在 `BLOCKED_COUNTRIES` 中，设置 `isBlocked = true`
4. **显示模态框**：`GeoBlockModal` 组件根据 `isBlocked` 状态显示/隐藏
5. **用户操作**：点击按钮后调用 `redirectToChinaSite()` 重定向

## 优雅降级

- 如果 Worker 端点不可用（网络错误、超时等），默认**不阻止访问**
- 如果检测失败，返回 `UNKNOWN`，不会触发封锁
- 确保网站即使在检测服务故障时也能正常访问

## 测试

### 本地测试

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 模拟 CN 国家代码：
   - 可以临时修改 `detectCountry()` 函数返回 `'CN'`
   - 或者部署 Worker 后使用 VPN 测试

### 生产测试

1. 部署 Worker 后，访问 `/geo` 端点验证返回格式
2. 使用中国大陆 IP 访问网站，验证模态框显示
3. 使用非 CN IP 访问，验证正常显示

## 文件清单

- `workers/geo-country.js` - Cloudflare Worker 源代码
- `workers/wrangler.toml` - Worker 配置文件
- `workers/README.md` - Worker 部署说明
- `src/components/GeoBlockModal.tsx` - 地理封锁模态框组件
- `src/utils/geoBlock.ts` - 地理检测工具函数
- `src/App.tsx` - 主应用（已集成地理封锁逻辑）

## 注意事项

1. **VPN 用户**：如果中国大陆用户使用 VPN，IP 不会被检测为 CN，将正常访问全球站点
2. **性能**：检测在页面加载时异步进行，不会阻塞页面渲染
3. **隐私**：只检测国家代码，不收集其他个人信息
4. **免费额度**：Cloudflare Workers 免费套餐每天 100,000 次请求，对大多数网站足够

## 后续优化建议

1. 可以添加本地存储缓存，避免每次页面加载都检测
2. 可以添加检测失败的重试机制
3. 可以根据需要添加更多被封锁的国家

