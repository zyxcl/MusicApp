
const BaseURL = 'https://music.zyxcl.xyz'
// const BaseURL = 'http://39.96.210.90:5001'

// let loadingCount = 0

// const showLoading = () => {
//   loadingCount++
//   uni.showLoading({
//   	title: '加载中',
//     mask: true
//   })
// }
// const hideLoading = () => {
//   loadingCount--
//   if (loadingCount === 0) {
//     uni.hideLoading()
//   }
// }

type AnyObject = Record<string, any>

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: AnyObject
  header?: AnyObject
}

const request = <T>({ url, method = 'GET', data = {}, header = {} }: RequestOptions): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const curCookie = uni.getStorageSync('curCookie') || ''
    const cookieData = curCookie ? { cookie: curCookie } : {}
    uni.request({
      url: BaseURL + url,
      method,
      data: {
        ...cookieData,
        ...data
      },
      header,
      withCredentials: true,
      success: res => {
        resolve(res.data as T)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export const get = <T>(url: string, data?: AnyObject, header?: AnyObject): Promise<T> => {
  return request<T>({ url, method: 'GET', data })
}
export const post = <T>(url: string, data?: AnyObject, header?: AnyObject): Promise<T> => {
  return request<T>({ url, method: 'POST', data })
}

export default request