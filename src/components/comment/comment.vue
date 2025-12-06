<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useMusicStore } from '@/store/music'
import { commentApi } from '@/api'
import type { Comment } from '@/types/api'

const musicStore = useMusicStore()

interface Props {
  visible: boolean
  type: string | number
  id: string | number
}

interface Emits {
  (event: 'update:visible', value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const popup = ref<any>(null)
const hotComments = ref<Comment[]>([])
const comments = ref<Comment[]>([])

watchEffect(async () => {
  if (props.visible) {
    popup.value?.open()
    const res = await commentApi(props.type, props.id)
    comments.value = res.comments || []
    hotComments.value = res.hotComments || []
  } else {
    popup.value?.close()
  }
})

const change = (e: { show: boolean }): void => {
  if (!e.show) {
    emits('update:visible', false)
  }
}

</script>

<template>
  <uni-popup ref="popup" type="bottom" background-color="#fff" @change="change">
    <scroll-view scroll-y class="list" >
      <uni-section title="热门评论" type="line" v-if="hotComments.length > 0">
         <uni-list>
           <uni-list-item
             v-for="(item, index) in hotComments"
             :key="item.commentId"
             :title="item.user.nickname"
             :note="item.content"
             showArrow
             :thumb="item.user.avatarUrl"
             thumb-size="base"
             clickable
           >
           </uni-list-item>
         </uni-list>
      </uni-section>
      <uni-section title="最新评论" type="line">
        <uni-list>
          <uni-list-item
            v-for="(item, index) in comments"
            :key="item.commentId"
            :title="item.user.nickname"
            :note="item.content"
            showArrow
            :thumb="item.user.avatarUrl"
            thumb-size="base"
            clickable
          >
          </uni-list-item>
        </uni-list>
      </uni-section>
    </scroll-view>
  </uni-popup>
</template>

<style lang="scss" scoped>
.list {
  height: 1000rpx;
}
</style>