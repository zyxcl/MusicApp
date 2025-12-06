import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginStatusApi, userDetailApi } from '@/api/user'
import type { UserAccount, UserProfile } from '@/types/api'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile | null>(null)
  const account = ref<UserAccount | null>(null)
  
  const getUserDetail = async (): Promise<void> => {
    if (!account.value) return

    const res = await userDetailApi(account.value.id)
    profile.value = {
      ...res.profile,
      level: res.level,
      listenSongs: res.listenSongs,
      createDays: res.createDays,
    }
  }

  const getAccount = async (): Promise<void> => {
    const res = await loginStatusApi()
    account.value = res.data.account
    if (res.data.profile) {
      await getUserDetail()
    }
  }
  
  return {
    profile,
    account,
    getAccount,
    getUserDetail
  }
});