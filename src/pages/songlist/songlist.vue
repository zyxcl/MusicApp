<script lang="ts" setup>
  import { ref } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'
  import { playlistDetailApi } from '@/api'
  import { useMusicStore } from '../../store/music'
  import type { Playlist, Song, Artist } from '@/types/api'

  const musicStore = useMusicStore()

  const playlist = ref<Partial<Playlist>>({})
  const showComment = ref(false)
  const id = ref<string>('')

  const getDetail = async (playlistId: string | number): Promise<void> => {
    const res = await playlistDetailApi(playlistId)
    playlist.value = res.playlist
  }

  onLoad((options: any) => {
    id.value = options.id
    getDetail(options.id)
  })
  // 把点击的歌曲添加到播放列表
  const goPlayer = (item: Song): void => {
    musicStore.addSong(item)
    uni.navigateTo({
      url: `/pages/player/player`
    })
  }
  // 把当前所有歌曲添加到播放列表
  const playAll = (): void => {
    const ids = playlist.value.trackIds?.map(v => v.id) || []
    musicStore.playAllSongs(ids)
    uni.navigateTo({
      url: `/pages/player/player`
    })
  }
  const arStr = (ar: Artist[]): string => {
    return ar.map(v => v.name).join('/')
  }
</script>

<template>
<playerBar>
  <view class="header">
    <div class="bg" :style="{ backgroundImage: `url(${playlist.coverImgUrl})` }">
      <view class="after"></view>
    </div>
    <view class="header-content">
      <view class="info">
        <image :src="playlist.coverImgUrl" mode="widthFix"></image>
        <view class="header-right">
          <view class="title">{{playlist.name}}</view>
          <view class="creator">
            <image :src="playlist.creator?.avatarUrl" mode="widthFix"></image>
            <view class="nickname">
              {{playlist.creator?.nickname}}
            </view>
          </view>
        </view>
      </view>
      <view class="desc">
        {{playlist.description}}
      </view>
      <view class="btns">
        <view class="btn">
          <uni-icons type="redo-filled" size="20" color="#ffffff"></uni-icons>
          {{ playlist.shareCount || '分享' }}
        </view>
        <view class="btn" @click="showComment = true">
          <uni-icons type="chat-filled" size="20" color="#ffffff"></uni-icons>
          {{ playlist.commentCount || '评论'  }}
        </view>
        <view class="btn">
          <uni-icons type="folder-add-filled" size="20" color="#ffffff"></uni-icons>
          {{ playlist.subscribedCount || '收藏' }}
        </view>
      </view>
    </view>
  </view>
  <view class="song-list">
    <uni-list :border="true">
      <uni-list-item clickable @click="playAll">
        <template v-slot:header>
          <mIcon type="bofang2" color="#c84341" :size="26"></mIcon>
        </template>
        <template v-slot:body>
          <view class="play-all">播放全部({{playlist.trackCount}})</view>
        </template>
      </uni-list-item>
      <uni-list-item
        v-for="(item, index) in playlist.tracks"
        :key="item.id"
        :title="item.name"
        :note="arStr(item.ar)"
        ellipsis="1"
        showArrow
        clickable
        @click="goPlayer(item)"
      >
        <template v-slot:header>
          <view class="no">
            {{index + 1}}
          </view>
        </template>
        <template v-slot:footer v-if="musicStore.curSongDetail.id === item.id">
          <view class="right-text">正在播放</view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
  <comment v-model:visible="showComment" type="playlist" :id="id" />    
</playerBar>
</template>



<style lang="scss" scoped>
.header {
  padding: 30rpx;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  transform: scale(1.5);
  .after {
    height: 100%;
    background: rgba(0,0,0,.25);
  }
}
.header-content {
  position: relative;
}
.info {
  display: flex;
  image {
    width: 240rpx;
    height: 240rpx;
    border-radius: 20rpx;
  }
}
.header-right {
  flex: 1;
  overflow: hidden;
  margin-left: 30rpx;
  .title {
    font-weight: bold;
  }
}
.creator {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
  image {
    width: 50rpx;
    height: 50rpx;
    border-radius: 50%;
  }
  .nickname {
    margin-left: 16rpx;
    flex: 1;
    overflow: hidden;
    font-size: 12px;
  }
}
.desc {
  font-size: 12px;
  margin: 20rpx 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.btns {
  display: flex;
  .btn {
    flex: 1;
    margin-right: 30rpx;
    height: 70rpx;
    border-radius: 40rpx;
    background: rgba(255, 255, 255, 0.2);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.song-list {
  .no {
    width: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-weight: bold;
  }
}
.play-all {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 20rpx;
}
.right-text {
  font-size: 12px;
  line-height: 80rpx;
  color: #c84341;
}
</style>
