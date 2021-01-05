<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar">
      <van-button slot="title"
                  class="search-btn"
                  icon="search"
                  type="info"
                  round
                  size="small">
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels"
               :title="channel.name"
               :key="channel.id">
        {{ channel.name }} 的内容
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { getUserChannels } from '@/api/user'

  export default {
    name: 'HomeIndex',
    components: {},
    props: {},
    data () {
      return {
        //控制被激活的标签
        active: 0,
        //频道列表
        channels: []
      }
    },
    computed: {},
    watch: {},
    created () {
      //加载文章标签列表
      this.loadChannels()
    },
    mounted () {
    },
    methods: {
      async loadChannels () {
        //请求获取频道数据
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      }
    },
  }
</script>
<style scoped lang="less">
  .home-container {
    /deep/ .van-nav-bar__title {
      max-width: none;
    }

    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;

      .van-icon {
        font-size: 16px;
      }

      .van-button__text {
        font-size: 14px;
      }
    }
  }
</style>
