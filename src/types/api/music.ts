import type { ApiResponse, Song, Playlist, Comment, Banner, HomeBlock, SearchSuggestItem } from './common'

// 轮播图响应
export interface BannerResponse extends ApiResponse {
  banners: Banner[]
}

// 歌单详情响应
export interface PlaylistDetailResponse extends ApiResponse {
  playlist: Playlist
}

// 榜单响应
export interface ToplistResponse extends ApiResponse {
  list: Playlist[]
}

// 热搜响应
export interface SearchHotResponse extends ApiResponse {
  result: {
    hots: Array<{
      first: string
      second?: string
      third?: string
      iconType?: number
    }>
    [key: string]: any
  }
}

// 搜索建议响应
export interface SearchSuggestResponse extends ApiResponse {
  result: {
    allMatch: SearchSuggestItem[]
    songs?: Song[]
    albums?: any[]
    artists?: any[]
    playlists?: any[]
    [key: string]: any
  }
}

// 搜索结果响应
export interface SearchResponse extends ApiResponse {
  result: {
    songs: Song[]
    songCount: number
    hasMore?: boolean
    [key: string]: any
  }
}

// 歌曲详情响应
export interface SongDetailResponse extends ApiResponse {
  songs: Song[]
  privileges?: any[]
}

// 歌词响应
export interface LyricResponse extends ApiResponse {
  lrc: {
    lyric: string
    version?: number
  }
  klyric?: {
    lyric: string
    version?: number
  }
  tlyric?: {
    lyric: string
    version?: number
  }
  code?: number
}

// 歌曲 URL 响应
export interface SongUrlResponse extends ApiResponse {
  data: Array<{
    id: number
    url: string
    br: number
    size: number
    md5?: string
    code: number
    type?: string
    level?: string
    encodeType?: string
  }>
}

// 评论响应
export interface CommentResponse extends ApiResponse {
  comments: Comment[]
  hotComments?: Comment[]
  total: number
  more: boolean
  code?: number
}

// 首页响应
export interface HomepageResponse extends ApiResponse {
  data: {
    blocks: HomeBlock[]
    cursor?: string
    hasMore?: boolean
    [key: string]: any
  }
}

// 推荐歌单响应
export interface TopPlaylistResponse extends ApiResponse {
  playlists: Playlist[]
  total: number
  code: number
  more?: boolean
  cat?: string
}

// 推荐歌曲响应
export interface RecommendSongsResponse extends ApiResponse {
  data: {
    dailySongs: Song[]
    orderSongs?: Song[]
  }
  code: number
}

// 语音列表响应（播客）
export interface VoicelistResponse extends ApiResponse {
  data?: any
  code?: number
  [key: string]: any
}
