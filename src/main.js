import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant 组件库
import Vant from 'vant'
// 加载 Vant 组件库的样式
import 'vant/lib/index.css'

// 自动设置 REM 基准值（html 标签的字体大小）
import 'amfe-flexible'

// 加载全局样式（最好放到最后，方便覆盖第三方样式）
import './styles/index.less'

// 全局注册 Vant 中的组件
Vue.use(Vant)

Vue.config.productionTip = false

// 创建Vue实例，将router、store等配置到根实例中
// 把App根组件渲染到 #app 节点上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
