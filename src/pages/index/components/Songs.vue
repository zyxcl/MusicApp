<script lang="ts" setup>
  import { useMusicStore } from '@/store/music'
  import type { Creative, Artist } from '@/types/api'

  interface Props {
    list: Creative[]
    title: string
    ids: (number | string)[]
  }

  const musicStore = useMusicStore()
  const props = defineProps<Props>()

  // 把当前所有歌曲添加到播放列表
  const playAll = async (id: number | string): Promise<void> => {
    const index = props.ids.indexOf(Number(id))
    await musicStore.playAllSongs(props.ids)
    musicStore.currentIndex = index
  }

  const formatAr = (ar: Artist[]): string => {
    return ar.map(v => v.name).join('/')
  }

  const cutIcon = (id: number | string): { type: string; color?: string } => {
    if (musicStore.curSongDetail.id === Number(id)) {
      return {
        type: 'bofangzhong',
        color: '#c84341'
      }
    } else {
      return {
        type: 'bofang'
      }
    }
  }
</script>

<template>
  <uni-section type="line" :title="title">
    <swiper class="song-swiper" next-margin="80rpx">
      <swiper-item v-for="(item, index) in list" :key="index">
        <uni-list :border="false">
          <uni-list-chat
            v-for="song in item.resources"
            :key="song.resourceId"
            :title="song.uiElement.mainTitle.title"
            :note="formatAr(song.resourceExtInfo.artists || [])"
            :avatar="song.uiElement.image.imageUrl"
            clickable
            ellipsis="1"
            @click="playAll(song.resourceId)"
          >
            <mIcon
              :size="24"
              :type="cutIcon(song.resourceId).type"
              :color="cutIcon(song.resourceId).color"
            />
          </uni-list-chat>
        </uni-list>
      </swiper-item>
    </swiper>
  </uni-section>
</template>


<style lang="scss" scoped>
  .song-swiper {
    height: 380rpx;
    // ::v-deep .uni-list--border {
    //   display: none;
    // }
    // ::v-deep .uni-list-item__icon-img {
    //   border-radius: 10rpx;
    // }
  }
  // .song {
  //   height: 120rpx;
  //   display: flex;
  //   box-sizing: border-box;
  //   padding: 10rpx 30rpx;
  //   image {
  //     width: 100rpx;
  //     height: 100rpx;
  //   }
  //   .song-info {
  //     flex: 1;
  //     padding: 0 20rpx;
  //   }
  // }
</style>