# Cloudflare Worker - Geo Country Detection

这个 Cloudflare Worker 用于检测访问者的国家代码，用于前端地理封锁功能。

## 部署说明

### 方式 1: 使用 Worker 默认 URL（推荐，最简单）

**无需配置任何路由！** 部署后直接使用 Cloudflare 自动分配的 URL。

#### 使用 Wrangler CLI 部署：

1. **安装 Wrangler**（如果还没有安装）:
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**:
   ```bash
   wrangler login
   ```

3. **部署 Worker**:
   ```bash
   cd workers
   wrangler deploy
   ```

4. **获取 Worker URL**:
   - 部署成功后，Wrangler 会显示 Worker 的 URL
   - 格式类似：`https://granoflow-geo-country.xxx.workers.dev`
   - 或者登录 Cloudflare Dashboard，在 Workers & Pages 中查看

5. **更新前端配置**:
   - 编辑 `src/utils/geoBlock.ts`
   - 将 `GEO_ENDPOINT` 改为 Worker 的完整 URL：
   ```typescript
   export const GEO_ENDPOINT = 'https://granoflow-geo-country.xxx.workers.dev';
   ```

#### 使用 Cloudflare Dashboard 部署：

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** > **Create** > **Create Worker**
3. 将 `geo-country.js` 的内容复制到编辑器
4. 点击 **Deploy**
5. 部署成功后，复制 Worker 的 URL（在 Worker 详情页可以看到）
6. 更新 `src/utils/geoBlock.ts` 中的 `GEO_ENDPOINT`

### 方式 2: 配置自定义路由（可选）

如果你想让 Worker 在你的主域名下运行（如 `yourdomain.com/geo`），需要配置路由：

1. 在 Cloudflare Dashboard 中，进入 Workers & Pages
2. 选择你部署的 Worker
3. 在 Settings > Triggers > Routes 中添加路由
4. 例如：`yourdomain.com/geo` 或 `yourdomain.com/api/geo-country`
5. 更新 `src/utils/geoBlock.ts` 中的 `GEO_ENDPOINT` 为相对路径：
   ```typescript
   export const GEO_ENDPOINT = '/geo';
   ```

**注意**：方式 2 需要你的网站也在 Cloudflare 上托管，否则无法配置路由。

## 工作原理

- Worker 使用 Cloudflare 的 `request.cf.country` 获取访问者的国家代码
- 返回 JSON 格式：`{ "country": "CN" }`
- 如果检测失败，返回 `{ "country": "UNKNOWN" }`，前端将不会阻止访问（优雅降级）

## 免费额度

Cloudflare Workers 免费套餐包含：
- 每天 100,000 次请求
- 对于大多数网站来说已经足够

## 测试

部署后，可以通过以下方式测试：

```bash
curl https://your-domain.com/geo
```

应该返回类似：
```json
{"country":"CN"}
```

