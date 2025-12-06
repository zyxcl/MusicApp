import request, { post, get } from './request'

// 首页
export const homepageApi = () => {
  return get('/homepage/block/page')
}
// 轮播图
export const bannerApi = () => {
  return get('/banner')
}
// 推荐歌单
export const topPlaylistApi = (data = {}) => {
  return get('/top/playlist', data)
}
// 首页图标
export const dragonBalltApi = () => {
  return get('/homepage/dragon/ball')
}
// 所有榜单
export const toplistApi = () => {
  return get('/toplist/detail')
}
// 歌单详情
export const playlistDetailApi = (id: string) => {
  return get('/playlist/detail', { id })
}
// 热搜列表
export const searchHotApi = () => {
  return get('/search/hot/detail')
}
// 搜索建议
export const searchSuggestApi = (keywords: string) => {
  return get('/search/suggest', {
    keywords,
    type: 'mobile'
  })
}
// 搜索
export const searchApi = (keywords: string) => {
  return get('/search', { keywords })
}

// 歌曲详情
export const songDetailApi = (ids: string) => {
  return get('/song/detail', { ids })
}
// 歌词
export const lyricApi = (id: string) => {
  return get('/lyric', { id })
}
// 音乐url
export const songUrlApi = (id: string) => {
  return get('/song/url', { id })
}
// 评论
export const commentApi = (type: number, id: string) => {
  return get(`/comment/${type}`, { id })
}

// 播客
export const voicelistApi = () => {
  return get(`/voicelist/list/search`, {
    type: 'mobile'
  })
}

// 每日推荐
export const recommendSongsApi = () => {
  return get(`/recommend/songs`)
}

