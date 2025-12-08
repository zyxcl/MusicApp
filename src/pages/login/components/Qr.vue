<script lang="ts" setup>
import { qrKeyApi, qrCreateApi, qrCheckApi } from '@/api/user'
import { ref, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const unikey = ref('')
const qrimg = ref('')
const qrStatus = ref('')
const qrCode = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const qrCheck = (): void => {
  timer = setInterval(async () => {
    const res = await qrCheckApi(unikey.value)
    console.log(res)
    qrCode.value = res.code
    if (res.code === 800) {
      // 二维码过期，重新获取二维码
      qrStatus.value = '已过期，点击重新获取'
      clearInterval(timer!)
    } else if (res.code === 801) {
      // 等待扫码
    } else if (res.code === 802) {
      // 等待确定
      qrStatus.value = '等待确认'
    } else if (res.code === 803) {
      qrStatus.value = '扫码成功'
      // 登录成功，把cookie存到本地
      uni.setStorageSync('curCookie', res.cookie)
      // 获取用户信息
      userStore.getAccount()
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      clearInterval(timer!)
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  }, 2000)
}

const getQr = async (): Promise<void> => {
  // 获取key
  const keyRes = await qrKeyApi()
  console.log(keyRes.data);
  unikey.value = keyRes.data.unikey
  // 创建二维码
  const qrInfoRes = await qrCreateApi(unikey.value)
  qrimg.value = qrInfoRes.data.qrimg
  // 开始轮询二维码状态
  qrCheck()
}

getQr()

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const resetQr = (): void => {
  if (qrCode.value === 800) {
    qrCode.value = null
    getQr()
  }
}

</script>

<template>
  <view class="qr-wrap">
    <image :src="qrimg" mode="widthFix"></image>
    <view class="qr-code" v-if="qrCode !== null && qrCode !== 801" @click="resetQr">{{ qrStatus }}</view>
  </view>
</template>

<style lang='scss' scoped>
.qr-wrap {
  position: relative;
  image {
    max-width: 500rpx;
    margin: 0 auto;
    display: block;
  }
}
.qr-code {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #ffffff, $alpha: .8);
  text-align: center;
  line-height: 300px;
  font-size: 22px;
}
</style>
