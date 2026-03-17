# 服务器部署说明（支持多人协同）

## 1. 准备配置
1. 复制配置模板：
   ```bash
   cp config.example.js config.js
   ```
2. 填写你自己的 Firebase 项目参数（可直接使用现有项目）。
3. `workspace` 代表协作空间，同一个 `workspace` 的用户会实时同步任务状态。

## 2. Docker 部署（推荐）
```bash
docker compose up -d --build
```

部署后访问：`http://<服务器IP>:8080`

## 3. 多人协同使用方式
- 默认协作空间：`default`。
- 可以通过 URL 指定协作空间（优先级高于 config.js）：
  - `http://<服务器IP>:8080/?workspace=妇产科A组`
- 同一空间内多个用户可实时同步勾选状态。

## 4. 关键同步机制说明
- 页面使用 Firestore `onSnapshot` 监听，远端数据变化会实时推送到所有在线终端。
- 任务勾选使用 `updateDoc` 按字段更新（如 `3.2.1`），避免整文档覆盖导致多人同时操作时互相覆盖。

## 5. 生产建议
- 配置 HTTPS（可由 Nginx 反向代理 + 证书，或云负载均衡）。
- Firestore 安全规则请限制为已登录用户/白名单用户访问，防止匿名写入。
