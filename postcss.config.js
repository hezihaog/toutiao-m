/**
 * PostCSS 的配置文件
 * PostCSS 是基于Node.js运行的一个处理 CSS 的工具
 * 所以它的配置文件，也是运行在Node.js中
 */

// PostCSS需要导出一个对象
module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    // Vue cli 已经在内部默认配置了 autoprefixer
    // 'autoprefixer': {
    //   // browsers 用来配置要兼容到的系统（浏览器）环境
    //   // 这个配置没有问题，但是写到这里会有控制台编译警告
    //   // 为什么？因为 Vue cli 是通过项目中的
    //   // .browserslistrc 文件来配置要兼容的环境信息的
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 把px 转为 rem
    'postcss-pxtorem': {
      // 转换的根元素的基准值
      // 正常情况下，按照你的设计稿来
      // 750 宽的设计稿，750 /10 = 75
      // 375 宽的设计稿，375 / 10 = 37.5
      // 注意：Vant 组件库是基于375 宽写的
      // 移动端页面一般都是以iphone6/7/8 为原型来设计的
      // Vant 组件库是基于逻辑像素 375 写的
      // 而设计稿都是基于物理像素 750 宽来设计的
      // 所以如果设计为 75 ，那么我们就可以在设计稿中测量多少，就写多少
      // 但是Vant 的样式就会变得很小，小了一半
      // 所以我们必须设计设置成 37.5 ，但是在测量设计稿时，必须让测量单位 /2 
      // 有没有更好的办法，不用计算
      rootValue: 37.5,
      // 配置需要转换的CSS属性，* 就是所有属性都要转换
      propList: ['*']
    }
  }
}