<script lang="ts" setup>

import { ref, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'
import { userPlaylistApi } from '@/api/user'
import type { Playlist } from '@/types/api'

// 引入store
const userStore = useUserStore()
const playlist = ref<Playlist[]>([])

watchEffect(async () => {
  if (userStore.account?.id) {
    const res = await userPlaylistApi(userStore.account.id)
    playlist.value = res.playlist
  }
})

const goList = (id: number | string): void => {
  uni.navigateTo({
    url: `/pages/songlist/songlist?id=${id}`
  })
}

</script>

<template>
  <playerBar>
    <view v-if="!userStore.profile">
      <navigator url="/pages/login/login">
        <button>去登录</button>
      </navigator>
    </view>
    <template v-else>
      <view class="header" :style="{ backgroundImage: `url(${userStore.profile?.backgroundUrl})` }">
        <image class="avatar" :src="userStore.profile?.avatarUrl" mode="aspectFill"></image>
        <view class="nickname">
          {{userStore.profile?.nickname}}
        </view>
        <view class="desc">
          <view class="desc-tag">
            <text class="bold">{{userStore.profile?.followeds}}</text>关注
          </view>
          <view class="desc-tag">
            <text class="bold">{{userStore.profile?.follows}}</text>粉丝
          </view>
          <view class="desc-tag">
            <text class="bold">Lv.{{userStore.profile?.level}}</text>等级
          </view>
          <view class="desc-tag">
            <text class="bold">{{userStore.profile?.listenSongs}}首</text>听歌
          </view>
        </view>
      </view>
      <uni-list>
        <uni-list-item
          v-for="item in playlist"
          :key="item.id"
          :title="item.name"
          :note="`${item.trackCount}首·${item.playCount}次播放`"
          :thumb="item.coverImgUrl"
          thumb-size="lg"
          clickable=""
          @click="goList(item.id)"
        ></uni-list-item>
      </uni-list>
    </template>
  </playerBar>
</template>

<style lang="scss">
  .header {
    height: 450rpx;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .avatar {
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    border: 1px solid #ffffff;
    margin: 100rpx auto 20rpx;
    display: block;
  }
  .nickname {
    text-align: center;
    color: #ffffff;
    font-weight: bold;
  }
  .desc {
    display: flex;
    justify-content: center;
    color: #cfc4c4;
    font-size: 14px;
    padding: 20rpx 0;
  }
  .desc-tag {
    margin: 0 20rpx;
  }
  .bold {
    font-weight: bold;
    margin-right: 10rpx;
    color: #ffffff;
  }
</style>
