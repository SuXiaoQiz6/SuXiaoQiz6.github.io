# 个人站点（GitHub Pages）

## 结构

- `/` — 首页：只放各方向入口（目前一个「产品经理作品集」）
- `/pm/` — 产品经理作品集详情
- 以后加其他经历：在 `index.html` 再加一张卡片，并新建对应文件夹即可

## 本地预览

```bash
cd personal-site
python -m http.server 5500
```

浏览器打开 http://localhost:5500

## 部署

1. 改 `index.html` 里的邮箱、GitHub 用户名
2. GitHub 新建仓库：`你的用户名.github.io`（用户站）或任意名如 `personal-site`（项目站）
3. Settings → Pages → Deploy from branch → `main` / `/ (root)`
