// 导出所有 API 类型
export * from './common'
export * from './music'
export * from './user'

// 通用类型工具
export type AnyObject = Record<string, any>

// 请求配置选项
export interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: AnyObject
  header?: AnyObject
}
