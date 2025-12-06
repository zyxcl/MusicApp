import type { ApiResponse } from './common'

// 用户账号信息
export interface UserAccount {
  id: number
  userName?: string
  type?: number
  status?: number
  whitelistAuthority?: number
  createTime?: number
  salt?: string
  tokenVersion?: number
  ban?: number
  vipType?: number
  anonimousUser?: boolean
  uninitialized?: boolean
  [key: string]: any
}

// 用户详细信息
export interface UserProfile {
  userId: number
  nickname: string
  avatarUrl: string
  backgroundUrl?: string
  signature?: string
  gender: number
  birthday?: number
  city?: number
  province?: number
  accountStatus?: number
  vipType?: number
  djStatus?: number
  mutual?: boolean
  followed?: boolean
  remarkName?: string

  // 扩展字段（来自 userDetail）
  level?: number
  listenSongs?: number
  createDays?: number
  followeds?: number
  follows?: number
  eventCount?: number
  playlistCount?: number
  playlistBeSubscribedCount?: number
  [key: string]: any
}

// 登录状态响应
export interface LoginStatusResponse extends ApiResponse {
  data: {
    code: number
    account: UserAccount | null
    profile: UserProfile | null
  }
}

// 登录响应
export interface LoginResponse extends ApiResponse {
  code: number
  account?: UserAccount
  profile?: UserProfile
  token?: string
  cookie?: string
  bindings?: any[]
}

// 验证码发送响应
export interface CaptchaSentResponse extends ApiResponse {
  code: number
  data?: boolean
  message?: string
}

// 验证码校验响应
export interface CaptchaVerifyResponse extends ApiResponse {
  code: number
  data?: boolean
  message?: string
}

// 二维码 Key 响应
export interface QrKeyResponse extends ApiResponse {
  data: {
    unikey: string
    code: number
  }
}

// 二维码创建响应
export interface QrCreateResponse extends ApiResponse {
  data: {
    qrurl: string
    qrimg: string
  }
}

// 二维码检测响应
export interface QrCheckResponse extends ApiResponse {
  code: number  // 800/801/802/803
  message: string
  cookie?: string
}

// 用户详情响应
export interface UserDetailResponse extends ApiResponse {
  profile: UserProfile
  level: number
  listenSongs: number
  createDays: number
  mobileSign?: boolean
  pcSign?: boolean
  peopleCanSeeMyPlayRecord?: boolean
  [key: string]: any
}

// 用户歌单响应
export interface UserPlaylistResponse extends ApiResponse {
  playlist: any[]
  version?: string
  more?: boolean
}
