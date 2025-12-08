# 项目优化待办清单

> 最后更新：2025-12-08
> 总进度：1/26 任务已完成 (4%)

---

## ✅ 已完成的任务

### API 请求层优化 ✓
- [x] 添加请求/响应拦截器（开发环境日志）
- [x] 实现统一错误处理和 HTTP 状态码映射
- [x] Cookie 缓存机制（5 秒缓存）
- [x] 支持环境变量配置 API 地址
- [x] Loading 状态管理
- [x] 请求超时配置（10 秒）
- [x] 修复 header 参数未传递的 bug
- [x] 新增 put() 和 del() 方法
- [x] 清理 request.ts 注释代码
- [x] 更新 CLAUDE.md 文档

**完成时间**: 2025-12-08
**预期收益**: ✅ 错误处理完善、性能提升、代码质量提高

---

## 🔥 高优先级任务（11 项）

### 1. 配置代码质量工具
- [ ] 添加 `.eslintrc.json` 配置文件
- [ ] 添加 `prettier.config.js` 配置文件
- [ ] 添加 `.editorconfig` 文件
- [ ] 在 `package.json` 中添加 lint 和 format scripts
- [ ] 配置 VSCode 保存自动格式化
- [ ] 运行 `npm run lint:fix` 修复现有问题

**预计耗时**: 30-60 分钟
**难度**: 低
**收益**: 代码风格统一、提高团队协作效率

---

### 2. 清除生产环境 console.log
- [ ] `src/pages/index/index.vue` (L18-19)
- [ ] `src/pages/search/search.vue` (L26, 53, 58)
- [ ] `src/pages/login/components/Qr.vue` (L17, 51)
- [ ] `src/store/music.ts` (L108)
- [ ] `src/pages/recommend/recommend.vue` (L12)
- [ ] 配置 ESLint 规则禁止 console
- [ ] 或使用条件编译包装调试日志

**预计耗时**: 15-30 分钟
**难度**: 低
**收益**: 减小包体积、隐藏敏感信息

---

### 3. 提取重复工具函数
- [ ] 创建 `src/utils/format.ts` 文件
- [ ] 提取 `formatArtists()` 函数（5 个文件使用）
- [ ] 更新以下文件引用：
  - [ ] `src/pages/player/player.vue`
  - [ ] `src/pages/songlist/songlist.vue`
  - [ ] `src/pages/recommend/recommend.vue`
  - [ ] `src/components/playlistCard/playlistCard.vue`
  - [ ] `src/pages/index/components/Songs.vue`

**预计耗时**: 30 分钟
**难度**: 低
**收益**: 减少代码重复、提高可维护性

---

### 4. 统一使用 async/await
- [ ] `src/pages/index/index.vue` - 替换 `.then()`
- [ ] `src/pages/toplist/toplist.vue` - 替换 `.then()`
- [ ] `src/pages/recommend/recommend.vue` - 替换 `.then()`
- [ ] `src/pages/login/components/Qr.vue` - 统一异步处理
- [ ] `src/pages/search/search.vue` - 优化异步逻辑

**预计耗时**: 2-3 小时
**难度**: 中
**收益**: 代码可读性提升、错误处理简化

---

### 5. 完善错误处理
- [ ] `src/pages/index/index.vue` - 添加 try/catch
- [ ] `src/pages/toplist/toplist.vue` - 添加 try/catch
- [ ] `src/pages/recommend/recommend.vue` - 添加 try/catch
- [ ] `src/pages/login/components/Qr.vue` - 添加错误处理
- [ ] 为所有页面添加全局错误边界
- [ ] 设计统一的错误提示 UI

**预计耗时**: 2 小时
**难度**: 中
**收益**: 应用稳定性提升、用户体验改善

---

### 6. 减少 any 类型使用
- [ ] `src/api/request.ts` - 为 error 创建类型
- [ ] `src/components/playlistCard/playlistCard.vue` - 定义 UniPopupInstance 类型
- [ ] `src/components/comment/comment.vue` - 定义 popup 类型
- [ ] `src/pages/songlist/songlist.vue` - 定义 PageOptions 类型
- [ ] `src/types/api/common.ts` - 移除 `[key: string]: any`

**预计耗时**: 1-2 小时
**难度**: 中
**收益**: 类型安全性提升、减少运行时错误

---

### 7. 启用 TypeScript 严格模式
- [ ] 在 `tsconfig.json` 中启用 `"strict": true`
- [ ] 修复 `strictNullChecks` 相关错误
- [ ] 修复 `noImplicitAny` 相关错误
- [ ] 修复其他严格模式错误
- [ ] 运行 `npm run type-check` 验证

**预计耗时**: 1-2 天
**难度**: 中-高
**收益**: 捕获更多潜在类型错误

---

### 8. 优化播放列表虚拟化
- [ ] 研究 uni-app 虚拟列表方案
- [ ] 在 `playlistCard.vue` 中实现虚拟滚动
- [ ] 测试 100+ 首歌曲的性能
- [ ] 优化滚动体验

**预计耗时**: 3-4 小时
**难度**: 中
**收益**: 长列表性能提升 3-5 倍

---

### 9. 拆分播放器组件
- [ ] 创建 `src/components/player/LyricDisplay.vue`
- [ ] 创建 `src/components/player/PlayControl.vue`
- [ ] 创建 `src/composables/useLyric.ts`
- [ ] 重构 `src/pages/player/player.vue`
- [ ] 测试播放功能完整性

**预计耗时**: 4-6 小时
**难度**: 中
**收益**: 代码可维护性显著提升

---

### 10. 优化搜索防抖
- [ ] 删除 `src/pages/search/search.vue` 中注释的防抖代码
- [ ] 创建 `src/composables/useDebounce.ts`
- [ ] 改用 Vue 3 组合式函数
- [ ] 测试搜索建议功能

**预计耗时**: 30 分钟
**难度**: 低
**收益**: 代码清晰度提升

---

### 11. 添加骨架屏
- [ ] 创建 `src/components/skeleton/SkeletonCard.vue`
- [ ] 创建 `src/components/skeleton/SkeletonList.vue`
- [ ] 在首页添加骨架屏
- [ ] 在歌单详情页添加骨架屏
- [ ] 在我的音乐页添加骨架屏

**预计耗时**: 1 天
**难度**: 中
**收益**: 用户体验显著改善

---

## 🟡 中优先级任务（8 项）

### 12. 歌词解析错误处理
- [ ] 在 `player.vue` 的 `getLyric()` 添加 try/catch
- [ ] 验证 API 返回数据格式
- [ ] 添加歌词格式错误的降级方案

**预计耗时**: 1 小时
**难度**: 低

---

### 13. API 请求重试机制
- [ ] 在 `src/api/request.ts` 添加重试配置
- [ ] 实现指数退避策略
- [ ] 配置可重试的错误类型
- [ ] 测试网络不稳定场景

**预计耗时**: 2-3 小时
**难度**: 中

---

### 14. 二维码轮询优化
- [ ] 在切换登录方式时清理定时器
- [ ] 或改用 AbortController
- [ ] 测试内存泄漏问题

**预计耗时**: 1 小时
**难度**: 低

---

### 15. 优化硬编码颜色和尺寸
- [ ] 创建 `src/styles/variables.scss`
- [ ] 定义全局颜色变量
- [ ] 定义全局尺寸变量
- [ ] 替换所有硬编码值

**预计耗时**: 2-3 小时
**难度**: 低

---

### 16. 优化状态管理性能
- [ ] 在 `music.ts` 中缓存 `arStr` 计算结果
- [ ] 使用 memoization 优化计算属性
- [ ] 测试性能改善

**预计耗时**: 1-2 小时
**难度**: 中

---

### 17. 批量 API 优化
- [ ] 与后端协商合并 API 端点
- [ ] 设计新的 `/song/detail-with-url` 接口
- [ ] 更新前端调用逻辑

**预计耗时**: 需要后端配合
**难度**: 中

---

### 18. 页面路由参数类型定义
- [ ] 创建 `src/types/pages.ts`
- [ ] 为每个页面定义 PageOptions 接口
- [ ] 替换所有 `options: any`

**预计耗时**: 1-2 小时
**难度**: 低

---

### 19. 修复已知 TypeScript 类型错误
- [ ] `userDeawer.vue:55` - button type 属性
- [ ] `Songs.vue:17` - playAllSongs 参数类型
- [ ] `Email.vue:52,59,75` - toast 和 form 类型
- [ ] `Phone.vue:66,68` - button type 属性

**预计耗时**: 1 小时
**难度**: 低

---

## 🟢 低优先级任务（6 项）

### 20. CSS 变量支持
- [ ] 迁移 SCSS 变量到 CSS 变量
- [ ] 支持动态主题切换

**预计耗时**: 3-4 小时
**难度**: 低

---

### 21. 响应式图片处理
- [ ] 使用图片 CDN 尺寸参数
- [ ] 根据设备 DPR 加载不同分辨率

**预计耗时**: 2-3 小时
**难度**: 中

---

### 22. 暗黑模式支持
- [ ] 定义暗黑主题颜色
- [ ] 在 Pinia 中添加主题状态
- [ ] 更新所有组件样式
- [ ] 添加主题切换按钮

**预计耗时**: 2-3 天
**难度**: 中

---

### 23. 国际化（i18n）
- [ ] 配置 vue-i18n
- [ ] 创建语言文件（中文/英文）
- [ ] 提取所有硬编码文本
- [ ] 添加语言切换功能

**预计耗时**: 3-5 天
**难度**: 中

---

### 24. PWA 支持
- [ ] 配置 vite-plugin-pwa
- [ ] 添加 manifest.json
- [ ] 实现 service worker
- [ ] 测试离线功能

**预计耗时**: 2-3 天
**难度**: 中

---

### 25. 测试覆盖
- [ ] 配置 Vitest
- [ ] 为 store 编写单元测试
- [ ] 为 API 编写单元测试
- [ ] 配置 Cypress 进行 E2E 测试
- [ ] 目标：80% 测试覆盖率

**预计耗时**: 1-2 周
**难度**: 高

---

## 📊 进度统计

### 按优先级
- 🔥 高优先级：0/11 完成 (0%)
- 🟡 中优先级：0/8 完成 (0%)
- 🟢 低优先级：0/6 完成 (0%)

### 按难度
- 简单任务：0/12 完成
- 中等任务：0/11 完成
- 困难任务：0/2 完成

### 预计总耗时
- 高优先级任务：约 3-4 周
- 中优先级任务：约 2 周
- 低优先级任务：约 3-4 周

---

## 🎯 推荐实施路线

### 第 1 周：工程化基础
1. 配置 ESLint + Prettier
2. 清除 console.log
3. 提取重复工具函数
4. 优化搜索防抖

**预期成果**：代码质量基础提升

---

### 第 2 周：代码质量提升
1. 统一使用 async/await
2. 完善错误处理
3. 减少 any 类型使用
4. 修复已知 TypeScript 错误

**预期成果**：代码健壮性显著提升

---

### 第 3 周：性能优化
1. 启用 TypeScript 严格模式
2. 播放列表虚拟化
3. 添加骨架屏
4. 优化状态管理性能

**预期成果**：用户体验和性能提升

---

### 第 4 周：架构优化
1. 拆分播放器组件
2. API 重试机制
3. 歌词解析优化
4. 硬编码值优化

**预期成果**：代码可维护性提升

---

## 📝 备注

- 每完成一个任务，请在复选框中打勾 `[x]`
- 建议每完成一组相关任务后提交一次代码
- 遇到问题可以调整优先级和顺序
- 可以根据实际情况增删任务项

---

**最后更新**: 2025-12-08
**维护者**: Claude Code
