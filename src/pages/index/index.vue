
<script lang="ts" setup>
import { ref } from 'vue'
import { bannerApi, topPlaylistApi, dragonBalltApi, homepageApi } from '@/api'
import { useUserStore } from '@/store/user'
import Header from './components/Header'
import Banner from './components/Banner'
import Ball from './components/Ball'
import Playlist from './components/Playlist'
import Songs from './components/Songs'

// 引入store
const userStore = useUserStore()
// 首页内容
const blocks = ref([])

homepageApi().then(res => {
  console.log(res.data.blocks)
  blocks.value = res.data.blocks
})

const showType = {
  BANNER: 'BANNER',
  DRAGON_BALL: 'DRAGON_BALL',
  HOMEPAGE_SLIDE_PLAYLIST: 'HOMEPAGE_SLIDE_PLAYLIST',
  HOMEPAGE_SLIDE_SONGLIST_ALIGN: 'HOMEPAGE_SLIDE_SONGLIST_ALIGN'
} as const

</script>
<template>
  <playerBar>
    <Header />
    <view class="block" v-for="block in blocks" :key="block.blockCode">
      <!-- 轮播 -->
      <Banner v-if="block.showType === showType.BANNER" :banners="block.extInfo.banners" />
      <!-- icon图标 -->
      <Ball v-else-if="block.showType === showType.DRAGON_BALL" />
      <!-- 歌单 -->
      <Playlist v-else-if="block.showType === showType.HOMEPAGE_SLIDE_PLAYLIST" :title="block.uiElement.subTitle.title" :list="block.creatives" />
      <!-- 歌曲 -->
      <Songs v-else-if="block.showType === showType.HOMEPAGE_SLIDE_SONGLIST_ALIGN" :title="block.uiElement.subTitle.title" :list="block.creatives" :ids="block.resourceIdList" />
      
    </view>
  </playerBar>

</template>


<style lang="scss" scoped>


</style>
