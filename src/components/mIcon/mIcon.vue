<script lang="ts" setup>
interface Props {
  size?: number
  type: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 30,
  color: '#333333'
})
</script>

<template>
  <view :class="['iconfont', `icon-${type}`, 'icon']" :style="{ fontSize: `${size}px`, color }"></view>
</template>

<style lang="scss" scoped>
@import '@/static/font/iconfont.css';
.icon {
  display: inline-block;
  vertical-align: top;
}
</style>