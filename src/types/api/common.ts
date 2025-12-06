// 通用响应包装器
export interface ApiResponse<T = any> {
  code: number
  message?: string
  data?: T
  [key: string]: any
}

// 艺术家
export interface Artist {
  id: number
  name: string
  picUrl?: string
  alias?: string[]
  albumSize?: number
  img1v1Url?: string
  briefDesc?: string
  [key: string]: any
}

// 专辑
export interface Album {
  id: number
  name: string
  picUrl: string
  pic?: string
  publishTime?: number
  size?: number
  artist?: Artist
  company?: string
  [key: string]: any
}

// 歌曲
export interface Song {
  id: number
  name: string
  ar: Artist[]        // artists
  al: Album           // album
  dt?: number         // duration
  url?: string        // 播放地址（需要额外获取）
  fee?: number
  mv?: number
  pop?: number
  h?: any
  m?: any
  l?: any
  [key: string]: any
}

// 歌单创建者
export interface Creator {
  userId: number
  nickname: string
  avatarUrl: string
  signature?: string
  backgroundUrl?: string
  gender?: number
  city?: number
  province?: number
  [key: string]: any
}

// 歌单
export interface Playlist {
  id: number
  name: string
  coverImgUrl: string
  creator: Creator
  description?: string
  trackCount: number
  playCount?: number
  subscribedCount?: number
  shareCount?: number
  commentCount?: number
  tags?: string[]
  tracks?: Song[]
  trackIds?: Array<{ id: number; v?: number; at?: number }>
  updateTime?: number
  createTime?: number
  [key: string]: any
}

// 评论用户
export interface CommentUser {
  userId: number
  nickname: string
  avatarUrl: string
  vipType?: number
  remarkName?: string
  [key: string]: any
}

// 评论
export interface Comment {
  commentId: number
  content: string
  time: number
  likedCount: number
  user: CommentUser
  beReplied?: Array<{
    user: CommentUser
    content: string
    beRepliedCommentId?: number
  }>
  ipLocation?: {
    ip?: string
    location?: string
  }
  [key: string]: any
}

// 轮播图
export interface Banner {
  pic: string
  targetId: number
  targetType?: number
  typeTitle?: string
  url?: string
  encodeId?: string
  song?: Song
  [key: string]: any
}

// 搜索建议项
export interface SearchSuggestItem {
  keyword: string
  type?: number
  alg?: string
  [key: string]: any
}

// 首页区块
export interface HomeBlock {
  blockCode: string
  showType: string
  extInfo?: {
    banners?: Banner[]
    [key: string]: any
  }
  uiElement?: {
    subTitle?: {
      title: string
      [key: string]: any
    }
    mainTitle?: {
      title: string
      [key: string]: any
    }
    image?: {
      imageUrl: string
      [key: string]: any
    }
    button?: {
      text: string
      [key: string]: any
    }
    [key: string]: any
  }
  creatives?: Creative[]
  resourceIdList?: string[]
  [key: string]: any
}

// 创意内容（首页歌单/歌曲项）
export interface Creative {
  creativeId: number | string
  creativeType?: string
  action?: string
  actionType?: string
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle?: {
      title: string
    }
    image?: {
      imageUrl: string
    }
    [key: string]: any
  }
  resources?: Resource[]
  position?: number
  [key: string]: any
}

// 资源项（歌曲等）
export interface Resource {
  resourceId: string
  resourceType?: string
  uiElement: {
    mainTitle: {
      title: string
    }
    subTitle?: {
      title: string
    }
    image: {
      imageUrl: string
    }
    [key: string]: any
  }
  resourceExtInfo: {
    artists?: Artist[]
    playCount?: number
    [key: string]: any
  }
  [key: string]: any
}
