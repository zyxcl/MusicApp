<script lang="ts" setup>
  import { ref } from 'vue'
  import { recommendSongsApi } from '../../api'
  import { useMusicStore } from '../../store/music'
  import type { Song, Artist } from '@/types/api'

  const musicStore = useMusicStore()

  const playlist = ref<Song[]>([])

  recommendSongsApi().then(res => {
    console.log(res.data.dailySongs)
    playlist.value = res.data.dailySongs
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
    const ids = playlist.value.map(v => v.id)
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
  <view>
    <uni-list :border="true">
      <uni-list-item clickable @click="playAll">
        <template v-slot:header>
          <mIcon type="bofang2" color="#c84341" :size="26"></mIcon>
        </template>
        <template v-slot:body>
          <view class="play-all">播放全部({{playlist.length}})</view>
        </template>
      </uni-list-item>
      <uni-list-item
        v-for="(item, index) in playlist"
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
</template>

<style lang="scss" scoped>
.play-all {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 20rpx;
}
</style>
