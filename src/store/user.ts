import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginStatusApi } from '@/api/user'
import { userDetailApi } from '@/api/user'



export const useUserStore = defineStore('user', () => {
  const profile = ref(null)
  const account = ref(null)
  
  const getUserDetail = async () => {
    const res = await userDetailApi(account.value.id)
    profile.value = {
      ...res.profile,
      level: res.level,
      listenSongs: res.listenSongs,
      createDays: res.createDays,
    }
  }
  
  const getAccount = async () => {
    const res = await loginStatusApi()
    account.value = res.data.account
    if (res.data.profile) {
      getUserDetail()
    }
  }
  
  return {
    profile,
    account,
    getAccount,
    getUserDetail
  }
});