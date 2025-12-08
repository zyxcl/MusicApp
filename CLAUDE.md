# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 **uni-app 3.0 + Vue 3 + TypeScript + Pinia** 的跨平台音乐应用,支持 H5、App、小程序等多个平台。项目使用网易云音乐 API (`https://music.zyxcl.xyz`) 作为数据源。

## 常用开发命令

### 开发环境
```bash
# H5 网页开发 (默认)
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# App 开发 (Android/iOS)
npm run dev:app
npm run dev:app-android
npm run dev:app-ios

# 其他小程序平台
npm run dev:mp-alipay      # 支付宝
npm run dev:mp-baidu       # 百度
npm run dev:mp-toutiao     # 抖音
```

### 构建和部署
```bash
# 构建 H5 版本
npm run build:h5

# 构建并部署到 GitHub Pages
npm run deploy

# TypeScript 类型检查
npm run type-check

# 构建微信小程序
npm run build:mp-weixin
```

## 核心架构

### 技术栈
- **框架**: uni-app 3.0 + Vue 3.4.21
- **语言**: TypeScript 4.9.4
- **状态管理**: Pinia 2.2.6
- **构建工具**: Vite 5.2.8
- **样式**: SCSS/Sass 1.80.6
- **UI 组件**: @dcloudio/uni-ui 1.5.7
- **工具库**: lodash 4.17.21

### 目录结构
```
src/
├── api/                    # API 接口层
│   ├── request.ts         # HTTP 请求封装 (基于 uni.request)
│   ├── index.ts           # 内容相关 API (音乐、歌单、搜索等)
│   └── user.ts            # 用户相关 API (登录、验证码、用户信息)
│
├── types/                  # TypeScript 类型定义
│   ├── api/               # API 相关类型
│   │   ├── index.ts       # 类型导出入口
│   │   ├── common.ts      # 通用类型
│   │   ├── music.ts       # 音乐相关类型
│   │   └── user.ts        # 用户相关类型
│   ├── store/             # Store 相关类型
│   │   ├── index.ts       # Store 类型导出
│   │   ├── music.ts       # 音乐 Store 类型
│   │   └── user.ts        # 用户 Store 类型
│   ├── index.ts           # 全局类型导出
│   └── utils.ts           # 工具类型
│
├── store/                  # Pinia 状态管理
│   ├── user.ts            # 用户状态 (账号信息、个人资料)
│   └── music.ts           # 音乐播放状态 (播放列表、当前歌曲、播放控制)
│
├── pages/                  # 页面层 (11个页面)
│   ├── index/             # 首页 (轮播图、推荐内容)
│   ├── login/             # 登录页 (二维码、手机号、邮箱)
│   ├── player/            # 播放器详情页
│   ├── search/            # 搜索页面
│   ├── songlist/          # 歌单详情
│   ├── mine/              # 我的音乐
│   └── ...                # 其他页面
│
├── components/            # 全局组件
│   ├── playerBar/        # 底部播放器栏 (全局)
│   ├── playlistCard/     # 播放列表弹窗
│   ├── comment/          # 评论组件
│   └── mIcon/            # 自定义图标
│
├── static/               # 静态资源 (图标、图片、字体)
├── App.vue               # 应用根组件
├── main.ts               # 应用入口
└── pages.json            # uni-app 路由配置
```

## 关键架构模式

### 1. API 请求层 (`/src/api/`)

**请求封装** (`request.ts`):
- **环境变量支持**: 基础 URL 通过 `VITE_API_BASE_URL` 环境变量配置，默认 `https://music.zyxcl.xyz`
- **Cookie 缓存机制**: 5秒缓存，减少同步 storage 读取，提升性能
- **统一错误处理**: HTTP 状态码映射、网络错误、超时错误的友好提示
- **请求拦截器**: 开发环境自动打印请求/响应日志
- **Loading 管理**: 支持可选的全局 loading 状态（防止重复显示）
- **超时配置**: 默认 10 秒请求超时
- **类型安全**: 泛型支持 `get<T>()`、`post<T>()`、`put<T>()`、`del<T>()`
- **跨域支持**: `withCredentials: true`

**请求方法**:
```typescript
// 基础用法
await get<BannerResponse>('/banner')

// 带 loading
await get<BannerResponse>('/banner', {}, {}, true)

// 自定义 header
await post<LoginResponse>('/login', data, { 'Custom-Header': 'value' })

// 更新 Cookie 后清除缓存
import { clearCookieCache } from '@/api/request'
uni.setStorageSync('curCookie', newCookie)
clearCookieCache()  // 确保下次请求使用新 Cookie
```

**API 分类**:
- `index.ts`: 音乐内容 API (首页、歌单、搜索、歌曲详情、歌词、评论等)
- `user.ts`: 用户认证 API (验证码、登录、用户信息、登录状态)

### 2. 状态管理 (`/src/store/`)

**User Store** (`user.ts`):
```typescript
// 状态
profile: null   // 用户个人信息
account: null   // 用户账号信息

// 关键方法
getAccount()     // 获取登录状态 (App.vue onLaunch 时调用)
getUserDetail()  // 获取用户详细信息
```

**Music Store** (`music.ts`):
```typescript
// 核心状态
audio: UniAudio          // uni.createInnerAudioContext() 音频对象
playlist: Song[]         // 播放列表
currentIndex: number     // 当前播放索引
currentTime: number      // 当前播放时间
isPlay: boolean         // 播放状态
isRandom: boolean       // 随机播放模式

// 计算属性
curSongDetail           // 当前歌曲详细信息 (自动更新)

// 关键方法
addSong(song)           // 添加单曲到播放列表
playAllSongs(ids)       // 批量播放歌曲
play()                  // 播放/暂停切换
changeMusic(index)      // 切换歌曲
changeCurrent(value)    // 拖动进度条
```

### 3. 认证流程

**二维码登录** (`/src/pages/login/components/Qr.vue`):
```typescript
1. qrKeyApi() → 获取二维码密钥
2. qrCreateApi(key) → 生成二维码图片
3. qrCheckApi(key) → 轮询检测扫码状态 (2秒间隔)
   - code=800: 二维码过期
   - code=801: 等待扫码
   - code=802: 等待确认
   - code=803: 登录成功 → 保存 Cookie → 获取用户信息 → 跳转首页
```

**Cookie 管理**:
- 登录成功后: `uni.setStorageSync('curCookie', res.cookie)`
- 所有 API 请求自动注入 Cookie
- 刷新页面时保持登录状态

### 4. 音乐播放流程

```
用户点击歌曲
  ↓
musicStore.addSong(song)
  ↓
songUrlApi(id) → 获取播放 URL
  ↓
playlist.unshift(song) → 添加到播放列表头部
  ↓
watch(curSongDetail) → 自动更新
  ↓
audio.src = url
  ↓
lyricApi(id) → 获取歌词
  ↓
audio.onCanplay() → 自动播放
  ↓
audio.onTimeUpdate() → 实时更新播放进度和歌词位置
```

### 5. 全局播放器

**PlayerBar 组件** (`/src/components/playerBar/`):
- 包裹所有页面,提供全局底部播放栏
- 显示当前播放歌曲信息
- 播放/暂停控制
- 点击跳转到播放器详情页
- 播放列表弹窗

**使用方式**:
```vue
<playerBar>
  <!-- 页面内容 -->
</playerBar>
```

### 6. 路由配置 (`pages.json`)

**TabBar 导航**:
- 首页: `/pages/index/index` (发现)
- 我的: `/pages/mine/mine` (我的音乐)

**页面跳转**:
```typescript
// Tab 页面
uni.switchTab({ url: '/pages/index/index' })

// 普通页面
uni.navigateTo({ url: `/pages/player/player?id=${id}` })
uni.navigateTo({ url: `/pages/songlist/songlist?id=${id}` })
```

## 开发注意事项

### TypeScript 配置
- 路径别名: `@/*` → `./src/*`
- 使用 `@dcloudio/types` 获取 uni-app API 类型
- 运行 `npm run type-check` 进行类型检查

### 样式处理
- 支持 SCSS/Sass
- 全局样式配置在 `pages.json` 中
- 主题色: `#c84341` (红色)

### 跨平台兼容
```typescript
// 条件编译示例
// #ifdef H5
navigationStyle: "custom"  // H5 端自定义导航栏
// #endif

// #ifndef H5
// 非 H5 平台代码
// #endif
```

### 组件自动导入
项目配置了 easycom,无需手动导入 uni-ui 组件:
```vue
<!-- 直接使用,无需 import -->
<uni-list-chat />
<uni-popup />
```

### 数据获取策略
```typescript
// 页面加载时获取
onLoad((options) => {
  const { id } = options
  // 获取数据
})

// 响应式自动获取
watchEffect(async () => {
  if (userStore.account?.id) {
    // 自动加载数据
  }
})

// 用户交互触发
const handleClick = async () => {
  // 获取数据
}
```

### 防抖优化
```typescript
import _ from 'lodash'
const debounceFunc = _.debounce(yourFunc, 1000)
```

## 构建配置

### Vite 配置 (`vite.config.ts`)
- Base URL: `/MusicApp` (用于 GitHub Pages 部署)
- 使用 `@dcloudio/vite-plugin-uni` 插件
- 自定义文件名清理规则 (Rollup)

### 部署
```bash
# 构建并部署到 GitHub Pages
npm run deploy

# 等同于
npm run build:h5 && gh-pages -d dist/build/h5
```

输出目录: `dist/build/h5`

## 关键设计决策

1. **单一 API 工厂**: 所有 API 通过 `get/post` 方法统一管理
2. **Cookie 持久化**: 使用 `uni.setStorageSync` 管理用户认证状态
3. **Pinia Composition API**: 现代化的状态管理方式
4. **全局 PlayerBar**: 包裹所有页面实现无缝播放体验
5. **计算属性优化**: `curSongDetail` 自动聚合当前歌曲信息
6. **音频原生 API**: 直接使用 `uni.createInnerAudioContext()`
7. **LRC 歌词解析**: 实时解析和同步显示歌词
