import request, { post, get } from './request'


// 获取验证码
export const captchaSentApi = (phone: string) => {
  return get(`/captcha/sent?timestamp=${Date.now()}`, { phone })
}
// 校验验证码
export const captchaVerifyApi = ({ phone, captcha }: { phone: string, captcha: string }) => {
  return get(`/captcha/verify?timestamp=${Date.now()}`, { phone, captcha })
}
// 手机号登录
export const loginCellphoneApi = ({ phone, captcha }: { phone: string, captcha: string }) => {
  return get(`/login/cellphone`, { phone, captcha })
}

// 获取二维码的key
export const qrKeyApi = () => {
  return get(`/login/qr/key?timestamp=${Date.now()}`)
}
// 生成二维码
export const qrCreateApi = (key: string) => {
  return get(`/login/qr/create?timestamp=${Date.now()}`, { key, qrimg: 'qrimg' })
}
// 二维码检测扫码状态接口
export const qrCheckApi = (key: string) => {
  return get(`/login/qr/check?timestamp=${Date.now()}`, { key, noCookie: true })
}
// 登录
export const loginApi = ({ email, password }: { email: string, password: string }) => {
  return get('/login', { email, password })
}
// 登录状态
export const loginStatusApi = () => {
  return post<{ data: { code: number, account: any, profile: any } }>('/login/status')
}

// 用户详情
export const userDetailApi = (uid: string) => {
  return post('/user/detail', { uid })
}
// 用户歌单
export const userPlaylistApi = (uid: string) => {
  return post('/user/playlist', { uid })
}
