/**
 * 工具类型定义
 */

/**
 * 深度可选 - 将对象的所有属性（包括嵌套）变为可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * 提取 Promise 返回值类型
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

/**
 * 提取数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never

/**
 * uni-app onLoad 选项参数类型
 */
export interface OnLoadOptions {
  [key: string]: string | undefined
}

/**
 * 只读深层对象
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * 必需深层对象
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

/**
 * 提取函数返回类型
 */
export type ReturnTypeOf<T extends (...args: any[]) => any> = ReturnType<T>

/**
 * 提取函数参数类型
 */
export type ParametersOf<T extends (...args: any[]) => any> = Parameters<T>
