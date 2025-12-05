import request from './request'


// 用户详情
export const userDetailApi = (uid) => {
  return request({
    url: '/user/detail',
    method: 'post',
    data: {
      uid
    }
  })
}
// 用户歌单
export const userPlaylistApi = (uid) => {
  return request({
    url: '/user/playlist',
    method: 'post',
    data: {
      uid
    }
  })
}
