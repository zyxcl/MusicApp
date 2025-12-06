<script lang="ts" setup>
import Email from './components/Email.vue'
import Qr from './components/Qr.vue'
import Phone from './components/Phone.vue'
import { ref } from 'vue'

const LoginType = {
  PHONE: 'phone',
  EMAIL: 'email',
  QR: 'qr'
} as const
type Type = typeof LoginType[keyof typeof LoginType]
const typeKey = ref<Type>(LoginType.QR)
const typeArr = [
  { text: '手机号登录', type: LoginType.PHONE },
  { text: '邮箱登录', type: LoginType.EMAIL },
  { text: '二维码登录', type: LoginType.QR }
]
</script>

<template>
  <view class="login">
    <Phone v-if="typeKey === LoginType.PHONE" />
    <Email v-else-if="typeKey ===  LoginType.EMAIL" />
    <Qr v-else-if="typeKey === LoginType.QR" />
    <view class="change-type">
      <view
        v-for="item in typeArr"
        :key="item.type"
        class="link"
        @click="typeKey = item.type"
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
