<script lang="ts" setup>
import { ref } from 'vue'
import { toplistApi } from '@/api'
import type { Playlist } from '@/types/api'

const toplist = ref<Playlist[]>([])
const otherlist = ref<Playlist[]>([])

toplistApi().then(res => {
  toplist.value = res.list.filter(v => v.tracks && v.tracks.length > 0)
  otherlist.value = res.list.filter(v => !v.tracks || v.tracks.length === 0)
})

const goDetail = (id: number | string): void => {
  uni.navigateTo({
    url: `/pages/songlist/songlist?id=${id}`
  })
}

</script>

<template>
<uni-section title="官方榜" type="line">
  <uni-card
    v-for="item in toplist"
    :key="item.id"
    :title="item.name"
    :sub-title="item.playCount"
    :extra="item.updateFrequency"
    :thumbnail="item.coverImgUrl"
    @click="goDetail(item.id)"
  >
    <view class="songs">
      <view class="song-item" v-for="(song, index) in item.tracks" :key="item.first">
        <text class="bold">{{index + 1}}. {{song.first}}</text>
        <text>- {{song.second}}</text>
      </view>
    </view>
  </uni-card>
</uni-section>

  <uni-section title="其他榜单" type="line" padding>
    <uni-grid :column="3" :highlight="true" :showBorder="false">
      <uni-grid-item v-for="(item, index) in otherlist" :key="item.id">
        <image :src="item.coverImgUrl" mode="widthFix" @click="goDetail(item.id)"></image>
      </uni-grid-item>
    </uni-grid>
  </uni-section>
</template>


<style lang="scss">
.song-item {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bold {
  font-weight: bold;
  margin-right: 5px;
}
.uni-grid-item {
  padding: 16rpx;
  box-sizing: border-box;
  image {
    width: 100%;
    border-radius: 10rpx;
  }
}
</style>
