import { get } from './request'
import type {
  BannerResponse,
  PlaylistDetailResponse,
  ToplistResponse,
  SearchHotResponse,
  SearchSuggestResponse,
  SearchResponse,
  SongDetailResponse,
  LyricResponse,
  SongUrlResponse,
  CommentResponse,
  HomepageResponse,
  TopPlaylistResponse,
  RecommendSongsResponse,
  VoicelistResponse,
  AnyObject
} from '@/types/api'

// 首页
export const homepageApi = () => {
  return get<HomepageResponse>('/homepage/block/page')
}

// 轮播图
export const bannerApi = () => {
  return get<BannerResponse>('/banner')
}

// 推荐歌单
export const topPlaylistApi = (data: AnyObject = {}) => {
  return get<TopPlaylistResponse>('/top/playlist', data)
}

// 首页图标
export const dragonBalltApi = () => {
  return get('/homepage/dragon/ball')
}

// 所有榜单
export const toplistApi = () => {
  return get<ToplistResponse>('/toplist/detail')
}

// 歌单详情
export const playlistDetailApi = (id: string | number) => {
  return get<PlaylistDetailResponse>('/playlist/detail', { id })
}

// 热搜列表
export const searchHotApi = () => {
  return get<SearchHotResponse>('/search/hot/detail')
}

// 搜索建议
export const searchSuggestApi = (keywords: string) => {
  return get<SearchSuggestResponse>('/search/suggest', {
    keywords,
    type: 'mobile'
  })
}

// 搜索
export const searchApi = (keywords: string) => {
  return get<SearchResponse>('/search', { keywords })
}

// 歌曲详情
export const songDetailApi = (ids: string | number | number[]) => {
  const idsParam = Array.isArray(ids) ? ids.join(',') : ids
  return get<SongDetailResponse>('/song/detail', { ids: idsParam })
}

// 歌词
export const lyricApi = (id: string | number) => {
  return get<LyricResponse>('/lyric', { id })
}

// 音乐url
export const songUrlApi = (id: string | number) => {
  return get<SongUrlResponse>('/song/url', { id })
}

// 评论
export const commentApi = (type: string | number, id: string | number) => {
  return get<CommentResponse>(`/comment/${type}`, { id })
}

// 播客
export const voicelistApi = () => {
  return get<VoicelistResponse>(`/voicelist/list/search`, {
    type: 'mobile'
  })
}

// 每日推荐
export const recommendSongsApi = () => {
  return get<RecommendSongsResponse>(`/recommend/songs`)
}

