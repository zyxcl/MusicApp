<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'

interface Props {
  visible: boolean
}

interface Emits {
  (event: 'update:visible', value: boolean): void
}

// 引入store
const userStore = useUserStore()
const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const userDrawer = ref<any>(null)

watchEffect(() => {
  if (props.visible) {
    userDrawer.value?.open()
  } else {
    console.log('userDrawer.value', userDrawer.value)
    userDrawer.value?.close()
  }
})

const change = (e: any): void => {
  if (!e) {
    emits('update:visible', false)
  }
}

const onClick = (): void => {
  uni.switchTab({
    url: '/pages/mine/mine'
  })
}
</script>

<template>
  <uni-drawer ref="userDrawer" mode="left" :width="320" @change="change">
    <view v-if="userStore.profile">
      <uni-list :border="true">
        <!-- 显示圆形头像 -->
        <uni-list-chat
          :avatar-circle="true"
          :title="userStore.profile.nickname"
          :avatar="userStore.profile.avatarUrl"
        ></uni-list-chat>
      </uni-list>
      <!-- {{userStore.profile}} -->
    </view>
    <navigator v-else url="/pages/login/login">
      <button type="primary" size="mini">去登录</button>
    </navigator>
  </uni-drawer>
</template>


<style lang="scss" scoped>
:v-deep .uni-card .uni-card__header {
  border-bottom: 0
}
</style>