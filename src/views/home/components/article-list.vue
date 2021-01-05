<template>
  <div class="article-list">
    <!--
      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 设置成 true
      此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      • load 事件：
        • List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        • 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
      • loading 属性：控制加载中的 loading 状态
        • 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        • 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件
      • finished 属性：控制加载结束的状态
        • 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        • 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <van-cell v-for="(article, index) in articles"
                  :key="index"
                  :title="article.title"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { getArticles } from '@/api/article'

  export default {
    name: 'ArticleList',
    props: {
      //频道数据
      channel: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        //数据列表
        articles: [],
        //控制加载中的loading状态
        loading: false,
        //控制加载结束的状态，当加载结束，就不再触发加载更多，显示没有更多
        finished: false,
        //获取下一页数据的时间戳
        timestamp: null,
        //下拉刷新的Loading状态
        isRefreshLoading: false,
        //下拉刷新成功的提示文本
        refreshSuccessText: ''
      }
    },
    methods: {
      async onLoad () {
        //请求获取数据
        const { data } = await getArticles({
          //频道ID
          channel_id: this.channel.id,
          //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳，timestamp 相当于页码，请求最新数据使用当前最新时间戳，下一页数据使用上一次返回的数据中的时间戳
          timestamp: this.timestamp || Date.now(),
          //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
          with_top: 1
        })
        const { results } = data.data
        console.log(data)
        //将新数据插入到原数组的后面
        this.articles.push(...results)

        //将加载状态设置为结束
        this.loading = false

        //如果还有下一页，更新页码
        if (results.length) {
          //加载下一页
          this.timestamp = data.data.pre_timestamp
        } else {
          //没有更多了
          this.finished = true
        }
      },
      async onRefresh () {
        //下拉刷新，请求获取数据，把数据追加到原数据的顶部
        const { data } = await getArticles({
          channel_id: this.channel.id,
          //下拉刷新，都传当前最新的时间戳
          timestamp: Date.now(),
          with_top: 1
        })
        //追加数据到顶部
        const { results } = data.data
        this.articles.unshift(...results)
        //关闭刷新状态
        this.isRefreshLoading = false
        //更新下拉刷新的成功文本
        this.refreshSuccessText = `更新了${results.length}条数据`
      }
    }
  }
</script>

<style scoped>
  /* 将文章列表固定定位，在频道的Tab之下，在底部BottomTab之上 */
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow: auto;
  }
</style>
