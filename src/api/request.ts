import type { AnyObject, RequestOptions } from '@/types/api'

// ==================== 配置 ====================

/** 基础 URL - 支持环境变量 */
const BaseURL = import.meta.env.VITE_API_BASE_URL || 'https://music.zyxcl.xyz'

/** 请求超时时间（毫秒） */
const REQUEST_TIMEOUT = 10000

/** 是否开启请求日志 */
const ENABLE_LOG = import.meta.env.DEV

// ==================== Cookie 缓存 ====================

let cookieCache: string | null = null
let cookieCacheTime = 0
const COOKIE_CACHE_DURATION = 5000 // 5秒缓存

/**
 * 获取 Cookie（带缓存）
 */
const getCookie = (): string => {
  const now = Date.now()
  if (cookieCache && now - cookieCacheTime < COOKIE_CACHE_DURATION) {
    return cookieCache
  }

  cookieCache = uni.getStorageSync('curCookie') || ''
  cookieCacheTime = now
  return cookieCache
}

/**
 * 清除 Cookie 缓存
 */
export const clearCookieCache = (): void => {
  cookieCache = null
  cookieCacheTime = 0
}

// ==================== Loading 管理 ====================

let loadingCount = 0

const showLoading = (): void => {
  if (loadingCount === 0) {
    uni.showLoading({
      title: '加载中',
      mask: true
    })
  }
  loadingCount++
}

const hideLoading = (): void => {
  loadingCount--
  if (loadingCount <= 0) {
    loadingCount = 0
    uni.hideLoading()
  }
}

// ==================== 错误处理 ====================

/** 错误码映射 */
const ERROR_MESSAGES: Record<number, string> = {
  400: '请求参数错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求资源不存在',
  500: '服务器错误',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时'
}

/**
 * 统一错误处理
 */
const handleError = (error: any, url: string): never => {
  let message = '请求失败'

  if (error.statusCode) {
    // HTTP 错误
    message = ERROR_MESSAGES[error.statusCode] || `请求失败 (${error.statusCode})`
  } else if (error.errMsg) {
    // uni.request 错误
    if (error.errMsg.includes('timeout')) {
      message = '请求超时，请检查网络'
    } else if (error.errMsg.includes('fail')) {
      message = '网络连接失败'
    } else {
      message = error.errMsg
    }
  }

  // 显示错误提示
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })

  // 日志记录
  if (ENABLE_LOG) {
    console.error(`[API Error] ${url}`, error)
  }

  throw new Error(message)
}

// ==================== 请求拦截器 ====================

/**
 * 请求前拦截
 */
const requestInterceptor = (config: {
  url: string
  method: string
  data: AnyObject
  header: AnyObject
}): void => {
  if (ENABLE_LOG) {
    console.log(`[API Request] ${config.method} ${config.url}`, {
      data: config.data,
      header: config.header
    })
  }
}

/**
 * 响应后拦截
 */
const responseInterceptor = <T>(response: any, url: string): T => {
  if (ENABLE_LOG) {
    console.log(`[API Response] ${url}`, response)
  }

  // HTTP 状态码检查
  if (response.statusCode !== 200) {
    handleError(
      { statusCode: response.statusCode, errMsg: 'HTTP Error' },
      url
    )
  }

  // 业务状态码检查（根据实际 API 调整）
  const data = response.data
  if (data && typeof data === 'object') {
    // 如果 API 返回的数据有 code 字段，可以在这里检查
    // 例如：if (data.code && data.code !== 200) { handleError(...) }
  }

  return data as T
}

// ==================== 核心请求方法 ====================

interface RequestConfig extends RequestOptions {
  showLoading?: boolean  // 是否显示 loading
  showError?: boolean    // 是否显示错误提示
}

/**
 * 核心请求方法
 */
const request = <T>({
  url,
  method = 'GET',
  data = {},
  header = {},
  showLoading: enableLoading = false,
  showError = true
}: RequestConfig): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    // 显示 Loading
    if (enableLoading) {
      showLoading()
    }

    // 获取 Cookie
    const curCookie = getCookie()
    const cookieData = curCookie ? { cookie: curCookie } : {}

    // 合并请求数据
    const requestData = {
      ...cookieData,
      ...data
    }

    // 合并请求头
    const requestHeader = {
      'Content-Type': 'application/json',
      ...header
    }

    // 请求配置
    const requestConfig = {
      url: BaseURL + url,
      method,
      data: requestData,
      header: requestHeader
    }

    // 请求拦截
    requestInterceptor(requestConfig)

    // 发起请求
    uni.request({
      ...requestConfig,
      timeout: REQUEST_TIMEOUT,
      withCredentials: true,
      success: (res) => {
        try {
          // 响应拦截
          const result = responseInterceptor<T>(res, url)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (err) => {
        if (showError) {
          handleError(err, url)
        }
        reject(err)
      },
      complete: () => {
        // 隐藏 Loading
        if (enableLoading) {
          hideLoading()
        }
      }
    })
  })
}

// ==================== 导出方法 ====================

/**
 * GET 请求
 */
export const get = <T>(
  url: string,
  data?: AnyObject,
  header?: AnyObject,
  showLoading?: boolean
): Promise<T> => {
  return request<T>({ url, method: 'GET', data, header, showLoading })
}

/**
 * POST 请求
 */
export const post = <T>(
  url: string,
  data?: AnyObject,
  header?: AnyObject,
  showLoading?: boolean
): Promise<T> => {
  return request<T>({ url, method: 'POST', data, header, showLoading })
}

/**
 * PUT 请求
 */
export const put = <T>(
  url: string,
  data?: AnyObject,
  header?: AnyObject,
  showLoading?: boolean
): Promise<T> => {
  return request<T>({ url, method: 'PUT', data, header, showLoading })
}

/**
 * DELETE 请求
 */
export const del = <T>(
  url: string,
  data?: AnyObject,
  header?: AnyObject,
  showLoading?: boolean
): Promise<T> => {
  return request<T>({ url, method: 'DELETE', data, header, showLoading })
}

export default request
