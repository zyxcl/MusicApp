import { post, get } from './request'
import type {
  CaptchaSentResponse,
  CaptchaVerifyResponse,
  LoginResponse,
  LoginStatusResponse,
  QrKeyResponse,
  QrCreateResponse,
  QrCheckResponse,
  UserDetailResponse,
  UserPlaylistResponse
} from '@/types/api'

// 获取验证码
export const captchaSentApi = (phone: string) => {
  return get<CaptchaSentResponse>(`/captcha/sent?timestamp=${Date.now()}`, { phone })
}

// 校验验证码
export const captchaVerifyApi = ({ phone, captcha }: { phone: string; captcha: string }) => {
  return get<CaptchaVerifyResponse>(`/captcha/verify?timestamp=${Date.now()}`, { phone, captcha })
}

// 手机号登录
export const loginCellphoneApi = ({ phone, captcha }: { phone: string; captcha: string }) => {
  return get<LoginResponse>(`/login/cellphone`, { phone, captcha })
}

// 获取二维码的key
export const qrKeyApi = () => {
  return get<QrKeyResponse>(`/login/qr/key?timestamp=${Date.now()}`)
}

// 生成二维码
export const qrCreateApi = (key: string) => {
  return get<QrCreateResponse>(`/login/qr/create?timestamp=${Date.now()}`, { key, qrimg: 'qrimg' })
}

// 二维码检测扫码状态接口
export const qrCheckApi = (key: string) => {
  return get<QrCheckResponse>(`/login/qr/check?timestamp=${Date.now()}`, { key, noCookie: true })
}

// 登录
export const loginApi = ({ email, password }: { email: string; password: string }) => {
  return get<LoginResponse>('/login', { email, password })
}

// 登录状态
export const loginStatusApi = () => {
  return post<LoginStatusResponse>('/login/status')
}

// 用户详情
export const userDetailApi = (uid: string | number) => {
  return post<UserDetailResponse>('/user/detail', { uid })
}

// 用户歌单
export const userPlaylistApi = (uid: string | number) => {
  return post<UserPlaylistResponse>('/user/playlist', { uid })
}
