<script lang="ts" setup>
import { captchaSentApi, captchaVerifyApi, loginCellphoneApi } from '@/api/user'

import { ref, computed, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/store/user'

// 引入store
const userStore = useUserStore()
const countDown = ref(0)
const phone = ref('')
const captcha = ref('')
const captchaText = computed(() => {
  return countDown.value === 0 ? '获取验证码' : `${countDown.value}s`
})
let timer: NodeJS.Timeout | null = null
const getCaptcha = async () => {
  const res = await captchaSentApi(phone.value)

  countDown.value = 10
  timer = setInterval(() => {
    countDown.value --
    if (countDown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const submit = async () => {
  try {
    await captchaVerifyApi({ phone: phone.value, captcha: captcha.value })
    const res = await loginCellphoneApi({ phone: phone.value, captcha: captcha.value })
    console.log(res);
    if (res.code === 200) {
      // 登录成功，把cookie存到本地
      uni.setStorageSync('curCookie', res.cookie)
      // 获取用户信息
      userStore.getAccount()
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      uni.switchTab({
        url: '/pages/index/index'
      })
    } else {
      uni.showToast({
      	title: '登录失败',
      	icon: 'error'
      })
    }
  } catch (e) {
    console.log(e);
  }
}

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<template>
  <view class="form">
    <view class="row"><input type="text" placeholder="请输入手机号" v-model.trim="phone"></view>
    <view class="row captcha">
      <input type="text" placeholder="请输入验证码" v-model="captcha">
      <button type="primary" @click="getCaptcha" :disabled="countDown > 0">{{ captchaText }}</button>
    </view>
    <view class="row"><button type="primary" @click="submit">登录</button></view>
  </view>
</template>

<style lang='scss' scoped>
.form {
  .row {
    margin-bottom: 20rpx;
  }
  input {
    outline: none;
    height: 80rpx;
    width: 100%;
    border-radius: 10rpx;
    border: 1rpx solid #dddddd;
    padding: 0 20rpx;
    box-sizing: border-box;
  }
  button {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    color: #ffffff;
    border: none;
    border-radius: 10rpx;
  }
}
.captcha {
  display: flex;
  input {
    flex: 1;
  }
  button {
    width: 200rpx;
    margin-left: 20rpx;
    &:disabled {
      opacity: 0.7;
    }
  }
}
</style>
