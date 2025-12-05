import request from './request'

// 首页
export const homepageApi = () => {
  return request({ url: '/homepage/block/page' })
}
// 轮播图
export const bannerApi = () => {
  return request({ url: '/banner' })
}
// 推荐歌单
export const topPlaylistApi = (data = {}) => {
  return request({ url: '/top/playlist', data })
}
// 首页图标
export const dragonBalltApi = () => {
  return request({ url: '/homepage/dragon/ball' })
}
// 所有榜单
export const toplistApi = () => {
  return request({ url: '/toplist/detail' })
}
// 歌单详情
export const playlistDetailApi = (id) => {
  return request({ url: '/playlist/detail', data: { id } })
}
// 热搜列表
export const searchHotApi = () => {
  return request({ url: '/search/hot/detail'})
}
// 搜索建议
export const searchSuggestApi = (keywords) => {
  return request({
    url: '/search/suggest',
    data: {
      keywords,
      type: 'mobile'
    }
  })
}
// 搜索
export const searchApi = (keywords) => {
  return request({
    url: '/search',
    data: {
      keywords
    }
  })
}

// 获取验证码
export const captchaSentApi = (phone) => {
  return request({
    url: `/captcha/sent?timestamp=${Date.now()}`,
    data: {
      phone
    }
  })
}
// 校验验证码
export const captchaVerifyApi = ({ phone, captcha }) => {
  return request({
    url: `/captcha/verify?timestamp=${Date.now()}`,
    data: {
      phone,
      captcha
    }
  })
}
// 手机号登录
export const loginCellphoneApi = ({ phone, captcha }) => {
  return request({
    url: `/login/cellphone`,
    data: {
      phone,
      captcha
    }
  })
}

// 获取二维码的key
export const qrKeyApi = () => {
  return request({
    url: `/login/qr/key?timestamp=${Date.now()}`
  })
}
// 生成二维码
export const qrCreateApi = (key) => {
  return request({
    url: `/login/qr/create?timestamp=${Date.now()}`,
    data: {
      key,
      qrimg: 'qrimg'
    }
  })
}
// 二维码检测扫码状态接口
export const qrCheckApi = (key) => {
  return request({
    url: `/login/qr/check?timestamp=${Date.now()}`,
    data: {
      key,
      noCookie: true
    }
  })
}
// 登录
export const loginApi = ({ email, password }) => {
  return request({
    url: '/login',
    method: 'GET',
    data: {
      email,
      password
    }
  })
}
// 登录状态
export const loginStatusApi = () => {
  return request({
    method: 'post',
    url: '/login/status',
  })
}
// 歌曲详情
export const songDetailApi = (ids) => {
  return request({
    url: '/song/detail',
    data: {
      ids
    }
  })
}
// 歌词
export const lyricApi = (id) => {
  return request({
    url: '/lyric',
    data: {
      id
    }
  })
}
// 音乐url
export const songUrlApi = (id) => {
  return request({
    url: '/song/url',
    data: {
      id
    }
  })
}
// 评论
export const commentApi = (type, id) => {
  return request({
    url: `/comment/${type}`,
    data: {
      id
    }
  })
}

// 播客
export const voicelistApi = () => {
  return request({
    url: `/voicelist/list/search`,
    data: {
    }
  })
}

// 每日推荐
export const recommendSongsApi = () => {
  return request({
    url: `/recommend/songs`
  })
}

