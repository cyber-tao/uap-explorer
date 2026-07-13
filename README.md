# UAP Explorer · 全球不明异常现象探索者

> 一个科幻探索风格的动态响应式网站，展示全球 22 起高置信度 UAP（不明异常现象）事件的科学编年、深度分析与多源媒体档案。

[📅 事件时间线](https://cyber-tao.github.io/uap-explorer/#/timeline) · [📊 分析](https://cyber-tao.github.io/uap-explorer/#/analysis) · [🏛 机构](https://cyber-tao.github.io/uap-explorer/#/institutions)

在线站点：[https://cyber-tao.github.io/uap-explorer/](https://cyber-tao.github.io/uap-explorer/)

---

## 预览

![时间线](https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800)

*全球 UAP 事件时间线 — 22 起高置信度事件按时间线编年，支持按置信度、地区、物理特征多维筛选。*

---

## 核心特性

| 特性 | 说明 |
|------|------|
| 🔥 **流体着色器 Hero** | 基于 Three.js 的自定义 WebGL 流体着色器，响应鼠标交互与时间流逝 |
| 🗺 **双视图时间线** | 网格卡片 + 时间轴双视图，按年代、置信度、地区、物理特征多维度筛选 |
| 📖 **深度事件档案** | 每个事件 300–1000 字详细描述，6 个真实媒体资源（图片/视频），3–20 条具体来源链接 |
| 🔗 **特征标签联动** | 事件详情页物理特征标签可点击，跳转时间线自动筛选同类特征事件 |
| 🖼 **媒体画廊** | 图片悬停缩放、视频可点击播放，所有媒体资源经真实来源验证 |
| 📱 **完全响应式** | 从 4K 到移动端的自适应布局，深色科幻风格 UI |
| ⚡ **性能优化** | HashRouter 静态构建，IntersectionObserver 暂停非视口动画 |
| 🎵 **可选 BGM** | 导航栏可开关 Cornfield Chase；无开场拦截层，直接进入站点 |

---

## 技术栈

```
React 19 + TypeScript 5.9 + Vite 7 + Tailwind CSS 3
├── Three.js — 自定义 WebGL 流体着色器 (GLSL)
├── React Router DOM 7 — HashRouter 静态路由
├── Lucide React — 图标系统
└── 全自定义 CSS 设计系统（Radix 原语 + Tailwind）
```

---

## 快速开始

### 环境要求

- Node.js ≥ 18
- npm 或 pnpm

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/cyber-tao/uap-explorer.git
cd uap-explorer

# 安装依赖
npm install

# 开发服务器
npm run dev
# → http://localhost:5173

# 生产构建
npm run build
# → dist/ 目录，可部署到任意静态托管

# 预览构建产物
npm run preview
# → http://localhost:4173
```

---

## 项目结构

```
uap-explorer/
├── public/
│   └── images/              # 22 张事件封面图片（本地 + 占位）
│       ├── event-nimitz.jpg
│       ├── event-gimbal.jpg
│       └── ...
├── src/
│   ├── components/
│   │   ├── FluidBackground.tsx    # Three.js WebGL 流体着色器
│   │   ├── Header.tsx             # 顶部导航 + 搜索
│   │   └── Footer.tsx             # 页脚
│   ├── data/
│   │   ├── events.ts              # 22 个事件完整数据（含媒体、来源、描述）
│   │   └── research_*.json        # 8 组研究子代理产出的原始数据
│   ├── pages/
│   │   ├── HomePage.tsx           # 首页（Hero 流体 + 精选事件）
│   │   ├── TimelinePage.tsx       # 时间线（搜索/筛选/双视图）
│   │   ├── EventDetailPage.tsx    # 事件详情（Hero/描述/媒体/来源）
│   │   ├── AnalysisPage.tsx       # 分析页（统计图表）
│   │   └── InstitutionsPage.tsx   # 机构页
│   ├── App.tsx                    # 路由配置
│   └── main.tsx                   # 入口
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 数据覆盖

| 事件 | 年份 | 地区 | 置信度 | 媒体 | 来源 |
|------|------|------|--------|------|------|
| Nimitz Tic Tac | 2004 | 北美 | 高 | 6 | 6 |
| 东海岸 Gimbal/GoFast | 2014-15 | 北美 | 高 | 6 | 6 |
| 比利时 UFO 波 | 1989-91 | 欧洲 | 高 | 5 | 8 |
| Colares 事件 | 1986 | 南美 | 高 | 4 | 8 |
| JAL 1628 | 1986 | 亚洲 | 高 | 6 | 7 |
| 杭州萧山机场 | 2010 | 亚洲 | 高 | 6 | 7 |
| 贵州都溪"空中怪车" | 1994 | 亚洲 | 高 | 8 | 12 |
| Malmstrom ICBM 失效 | 1967 | 北美 | 高 | 4 | 7 |
| 礼炮6号宇航员目击 | 1981 | 太空 | 中 | 3 | 8 |
| 礼炮7号"太空天使" | 1984 | 太空 | 中 | 3 | 9 |
| 阿波罗17号 | 1972 | 太空 | 中 | 4 | 10 |
| 罗斯威尔 | 1947 | 北美 | 中 | 9 | 9 |
| 华盛顿入侵 | 1952 | 北美 | 中 | 5 | 8 |
| ... 共 **22 个事件** | | | | **100+** | **150+** |

---

## 媒体资源来源

所有事件媒体资源均经过 **Agent 子代理网络搜索验证**，来源包括：

- **政府官方**：DoD 五角大楼、NASA、Naval Air Systems Command、英国国家档案馆
- **学术机构**：Nature、arXiv、NASA NTRS、Condon Report
- **权威媒体**：NYT、CBS News、60 Minutes、BBC、CCTV、新华社
- **UFO 专业档案**：The Black Vault、NICAP、CUFOS、MUFON、UFO Evidence
- **直接影像**：FLIR 官方视频、DVIDS 截图、NASA 任务照片、CEFAA 分析帧

---

## 路由说明

本项目使用 **HashRouter** 以支持静态托管（Vercel/Netlify/GitHub Pages）：

| 路径 | 页面 |
|------|------|
| `/#/` | 首页（Hero + 精选） |
| `/#/timeline` | 时间线（搜索 + 筛选） |
| `/#/timeline?characteristic=multi-sensor` | 时间线筛选结果 |
| `/#/event/nimitz-tic-tac` | 事件详情 |
| `/#/analysis` | 分析页 |
| `/#/institutions` | 机构页 |

---

## 构建与部署

本仓库通过 GitHub Actions 自动构建并发布到 GitHub Pages。

- Workflow：[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
- 触发：推送到 `main`，或在 Actions 页手动 `workflow_dispatch`
- 产物：`npm install` → `npm run build` → 部署 `dist/`
- 站点：https://cyber-tao.github.io/uap-explorer/

首次启用时，在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

### 本地构建

```bash
npm install
npm run build
# dist/ 为纯静态文件，可部署到任意静态托管
```

### 任意静态服务器

`dist/` 目录包含纯静态文件，无需后端。`vite.config.ts` 使用 `base: './'`，配合 HashRouter，适合项目页路径托管。

---

## 设计系统

### 颜色

```css
/* 主色 */
--primary: #30B0D0;        /* 天蓝 — 交互、链接、高亮 */
--accent: #00D9A5;           /* 翠绿 — 高置信度 */

/* 背景 */
--bg-dark: #050A0F;          /* 深空黑 */
--bg-card: #0A1117;          /* 卡片 */
--bg-surface: #0F1923;       /* 表面 */

/* 文字 */
--text-primary: #EDE8E4;       /* 暖白 */
--text-secondary: #8A99A8;   /* 灰蓝 */
```

### 字体

- 标题：`font-serif-display`（衬线展示字体）
- 数据：`font-mono-data`（等宽数据字体）
- 正文：系统无衬线字体

---

## 开发日志

| 阶段 | 内容 |
|------|------|
| v1.0 | 基础网站框架（Hero 流体 + 3 页） |
| v1.1 | 22 事件数据填充、图片下载 |
| v1.2 | 图片渲染修复、返回箭头修复 |
| v1.3 | **AgentSwarm 研究**：8 组并行 Agent 搜索真实链接、媒体、扩充描述 |
| v1.4 | 特征标签可点击、URL 参数筛选、媒体画廊 |

---

## 贡献

欢迎提交 Issue 或 PR：

1. Fork 本仓库
2. 创建分支：`git checkout -b feature/xxx`
3. 提交修改：`git commit -m "feat: xxx"`
4. 推送分支：`git push origin feature/xxx`
5. 创建 Pull Request

---

## License

MIT © 2025 UAP Explorer

---

> *"保持好奇，保持质疑。"* — UAP Explorer
