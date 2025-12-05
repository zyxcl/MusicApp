<script lang="ts" setup>
import Email from './components/Email.vue'
import Qr from './components/Qr.vue'
import Phone from './components/Phone.vue'
import { ref } from 'vue'

const loginType = ref('qr') // phone || email || qr
const typeArr = [
  // { text: '手机号登录', type: 'phone' },
  // { text: '邮箱登录', type: 'email' },
  { text: '二维码登录', type: 'qr' }
]
</script>

<template>
  <view class="login">
    <Phone v-if="loginType === 'phone'" />
    <Email v-else-if="loginType === 'email'" />
    <Qr v-else />
    <view class="change-type">
      <view
        v-for="item in typeArr"
        :key="item.type"
        class="link"
        @click="loginType = item.type"
      >
        {{ item.text }}
      </view>
    </view>    
  </view>
</template>



<style lang="scss" scoped>
.login {
  padding: 30rpx;
}
.change-type {
  font-size: 12px;
  display: flex;
  justify-content: center;
  padding: 40rpx;
  .link {
    margin: 0 10px;
  }
}
</style>
