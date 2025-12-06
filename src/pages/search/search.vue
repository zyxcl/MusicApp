
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { searchSuggestApi, searchApi } from '@/api'
import type { Song } from '@/types/api'
import Hot from './components/hot.vue'
import _ from 'lodash'

// 搜索建议项类型
interface SearchSuggestItem {
  keyword: string
  [key: string]: any
}

const searchValue = ref('') // 搜索框内容
const searchHistory = ref<string[]>(uni.getStorageSync('searchHistory') || []) // 搜索历史记录
const showSuggest = ref(false) // 显示搜索建议
const suggestList = ref<SearchSuggestItem[]>([]) // 搜索建议列表
const showResult = ref(false) // 显示搜索结果
const resultList = ref<Song[]>([]) // 搜索结果


const startSuggest = async (): Promise<void> => {
  const res = await searchSuggestApi(searchValue.value)
  suggestList.value = res.result.allMatch
  console.log('触发搜索建议');
}
// 添加防抖
const debounceSuggest = _.debounce(startSuggest, 1000)

// 添加防抖： 连续多次调用同一个函数，只执行最后一次
let timer: ReturnType<typeof setTimeout> | null = null
const input = async (val: string): Promise<void> => {
  if (val.length > 0) {
    showSuggest.value = true
    showResult.value = false
    debounceSuggest()
    // console.log('正在输入');
    // if (timer) clearTimeout(timer)
    // timer = setTimeout(() => {
    //   console.log('开始调用接口');
    //   startSuggest()
    // }, 1000)
  }
}
const cancel = (): void => {
  showSuggest.value = false
  showResult.value = false
  resultList.value = []
  suggestList.value = []
}
const search = async (): Promise<void> => {
  console.log('确定搜索', searchValue.value)
  showSuggest.value = false
  showResult.value = true

  const res = await searchApi(searchValue.value)
  console.log(res);
  resultList.value = res.result.songs

  // 添加搜索历史
  const index = searchHistory.value.indexOf(searchValue.value)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  searchHistory.value.unshift(searchValue.value)
  uni.setStorageSync('searchHistory', searchHistory.value)
}
const clearHistory = (): void => {
  searchHistory.value = []
  uni.setStorageSync('searchHistory', searchHistory.value)
}
const startSearch = (keyword: string): void => {
  searchValue.value = keyword
  setTimeout(() => {
    search()
  })
}
const goPlay = (id: number | string): void => {
  uni.navigateTo({
    url: `/pages/player/player?id=${id}`
  })
}

</script>

<template>
  <view class="page">
    <uni-search-bar
      @confirm="search"
      @cancel="cancel"
      @input="input"
      v-model="searchValue"
      placeholder="请输入要搜索的歌曲/歌手"
    ></uni-search-bar>
    <view class="content">
      <view class="suggest" v-if="showSuggest">
        <view class="suggest-item" v-for="item in suggestList" :key="item.keyword" @click="startSearch(item.keyword)">
          {{item.keyword}}
        </view>
      </view>
      <view class="result" v-else-if="showResult">
        <view class="result-item" v-for="item in resultList" :key="item.id" @click="goPlay(item.id)">
          <view>
            {{item.name}}
          </view>
          <view>
            专辑：{{item.album.name}}
          </view>
          <view>
            <text v-for="val in item.artists" :key="val.id">{{ val.name }}</text>
          </view>
        </view>
      </view>
      <Hot v-else :historyList="searchHistory" @clearHistory="clearHistory" @startSearch="startSearch" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.page {
}
.content {
}
.suggest-item {
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1px dashed #dddddd;
  padding: 0 30rpx;
}
.result-item {
  border-bottom: 1px dashed #dddddd;
  padding: 30rpx;
}
</style>
