<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useMusicStore } from '@/store/music'

interface Props {
  padding?: string | number
}

const props = defineProps<Props>()

const musicStore = useMusicStore()
const visible = ref(false)
const goPlayer = () => {
  uni.navigateTo({
    url: '/pages/player/player'
  })
}

</script>
<template>
  <view class="player-bar-wrap">
    <view class="content">
      <slot></slot>
    </view>
    <uni-list v-if="musicStore.curSongDetail.name" :border="true">
      <uni-list-chat
        :title="musicStore.curSongDetail.name"
        :avatar="musicStore.curSongDetail.al?.picUrl"
        :note="musicStore.curSongDetail.arStr"
        clickable
        @click="goPlayer"
      >
        <view class="chat-custom-right">
          <mIcon class="l-icon" :size="24" :type="musicStore.isPlay ? 'zanting2' : 'bofang2'" @click.stop="musicStore.play()"></mIcon>
          <mIcon :size="24" type="24gf-playlistMusic4" @click.stop="visible = true"></mIcon>
        </view>
      </uni-list-chat>
    </uni-list>
    <playlistCard v-model:visible="visible" />
  </view>
</template>



<style lang="scss" scoped>
.player-bar-wrap {
  width: 100%;
  height: $content-height;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: auto;
}
.chat-custom-right {
  display: flex;
  align-items: center;
  height: 100%;
  .l-icon {
    margin-right: 30rpx;
  }
}

</style>