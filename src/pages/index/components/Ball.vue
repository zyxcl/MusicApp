<script lang="ts" setup>
  const navIcons = [
    {
      "id": -1,
      "name": "每日推荐",
      "iconUrl": "http://p1.music.126.net/4DpSgAVpJny4Ewf-Xw_WQQ==/109951163986641971.jpg",
      "url": "/pages/recommend/recommend"
    },
    {
      "id": -6,
      "name": "私人FM",
      "iconUrl": "http://p1.music.126.net/Shi7cRT1bDhwpVDM7AOFXg==/109951165265330616.jpg",
      "url": "/pages/personalfm/personalfm"
    },
    {
      "id": -2,
      "name": "歌单",
      "iconUrl": "http://p1.music.126.net/uG5p6CnwAHrLqOkaSeRlnA==/109951163986649164.jpg",
      "url": "",
    },
    {
      "id": -3,
      "name": "排行榜",
      "iconUrl": "http://p1.music.126.net/SDFC6A3X2wzUCavYyeGIOg==/109951163986649670.jpg",
      "url": "/pages/toplist/toplist"
    },
    {
      "id": 1025001,
      "name": "有声书",
      "iconUrl": "http://p1.music.126.net/Kb4oK0m_ocs3FR3lo-r9yg==/109951167319110429.jpg",
      "url": ""
    },
    {
      "id": 13000,
      "name": "数字专辑",
      "iconUrl": "http://p1.music.126.net/nRWhsf3P7r7eqHz-v61VBg==/109951166989045593.jpg",
      "url": ""
    },
    {
      "id": 11000,
      "name": "直播",
      "iconUrl": "http://p1.music.126.net/2JvVZZjcjyCE72fGMsC1hg==/109951166989043011.jpg",
      "url": ""
    },
    {
      "id": 1025000,
      "name": "关注新歌",
      "iconUrl": "http://p1.music.126.net/BAOWsqZmmxL8JIH-wejMmQ==/109951167294312390.jpg",
      "url": ""
    },
    {
      "id": 1027000,
      "name": "收藏家",
      "iconUrl": "http://p1.music.126.net/gk99UFRasebERf38t6A1kA==/109951168168319514.jpg",
      "url": ""
    }
  ]
  const link = (url) => {
    if (!url) return
    uni.navigateTo({
      url
    })
  }
  
</script>

<template>
  <swiper class="icon-swiper" display-multiple-items="5">
    <swiper-item v-for="item in navIcons" :key="item.id">
      <image :src="item.iconUrl" mode="widthFix" @click="link(item.url)"></image>
      <view class="icon-name">
        {{item.name}}
      </view>
    </swiper-item>
  </swiper>
</template>


<style lang="scss" scoped>
  .icon-swiper {
    height: 150rpx;
    swiper-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    image {
      width: 80rpx;
      height: 80rpx;
      background: $primary-color;
      border-radius: 50%;
    }
    .icon-name {
      font-size: 12px;
      margin-top: 16rpx;
    }
  }
  
</style>