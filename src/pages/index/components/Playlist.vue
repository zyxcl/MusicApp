<script lang="ts" setup>
  import type { Creative } from '@/types/api'

  interface Props {
    list: Creative[]
    title: string
  }

  const props = defineProps<Props>()

  const goDetail = (id: number | string): void => {
    uni.navigateTo({
      url: `/pages/songlist/songlist?id=${id}`
    })
  }
</script>

<template>
  <uni-section type="line" :title="title">
    <view class="playlist">
      <view class="playlist-item" v-for="item in list" :key="item.creativeId" @click="goDetail(item.creativeId)">
        <image :src="item.uiElement.image?.imageUrl" mode="widthFix"></image>
        <view class="playlist-item-name">
          {{item.uiElement.mainTitle.title}}
        </view>
      </view>
    </view>
  </uni-section>
</template>


<style lang="scss" scoped>
  
.playlist {
  display: flex;
  flex-wrap: nowrap;
  padding: 0 30rpx 20rpx;
  overflow: auto;
}
.playlist::-webkit-scrollbar {
  display: none;
}
.playlist-item {
  width: 240rpx;
  flex-shrink: 0;
  margin-right: 20rpx;
  image {
    width: 240rpx;
    height: 240rpx;
    border-radius: 10rpx;
  }
}
.playlist-item-name {
  font-size: 24rpx;
  height: 70rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
}
</style>