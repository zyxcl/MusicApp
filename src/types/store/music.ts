import type { Song } from '../api'

// 扩展的歌曲类型（带播放地址）
export interface PlayableSong extends Song {
  url: string
  arStr?: string  // 艺术家字符串，由 ar 数组生成
}
