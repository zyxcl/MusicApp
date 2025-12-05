
const BaseURL = 'https://music.zyxcl.xyz'
// const BaseURL = 'http://39.96.210.90:5001'

let loadingCount = 0

const showLoading = () => {
  loadingCount++
  uni.showLoading({
  	title: '加载中',
    mask: true
  })
}
const hideLoading = () => {
  loadingCount--
  if (loadingCount === 0) {
    uni.hideLoading()
  }
}

// 封装请求函数
const request = ({ url, method = 'GET', data = {}, header = {} }) => {
  // showLoading()
  return new Promise((resolve, reject) => {
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
      withCredentials: true, // 跨域请求携带 cookie
      success: res => {
        resolve(res.data)
        // hideLoading()
      },
      fail: err => {
        reject(err)
        // uni.hideLoading()
      }
    })
  })
}

export default request