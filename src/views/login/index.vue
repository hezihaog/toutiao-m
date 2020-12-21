<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <!--
      基于Vant的表单验证
      1、使用 van-form 组件包裹所有的表单项 van-field
      2、给 van-form 绑定 submit 事件处理
        当表单提交时，会触发 submit 事件
        提示：只有表单验证通过，它才会调用 submit
      3、使用 Field 的rules属性定义校验规则
      4.:show-error="false"，是否显示错误到表单项中
        :show-error-message="false"，是否显示错误信息到表单项中
        validate-first，是否有某一项出错后，就不继续向下验证，默认为false，即会验证所有，但通常没必要，只要有一项错误，就返回错误即可
          如果要设置该值为true，则直接添加属性即可，或者进行属性绑定，:validate-first="true"
          如果要设置该值为false，则必须进行属性绑定，就是要加冒号:
     -->
    <van-form
      validate-first
      :show-error="false"
      :show-error-message="false"
      @submit="onLogin"
      @failed="onFailed">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        clearable
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code">
        <template #button>
          <van-button
            class="send-btn"
            size="small"
            round>
            发送验证码
          </van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { login } from '@/api/user'

  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile: '',//手机号
          code: ''//验证码
        },
        //表单验证规则
        formRules: {
          mobile: [{
            required: true,
            message: '请填写用户名'
          }, {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '手机号格式错误'
          }],
          code: [
            {
              required: true,
              message: '请填写验证码'
            },
            {
              pattern: /^\d{6}$/,
              message: '验证码格式错误'
            }
          ]
        }
      }
    },
    computed: {},
    watch: {},
    created () {
    },
    mounted () {
    },
    methods: {
      //提交登录
      async onLogin () {
        this.$toast.loading({
          message: '登录中...',//提示文本
          forbidClick: true,//禁止背景点击
          duration: 0//展示时长，默认2秒，为0是则一直展示
        })
        //找到数据接口
        //封装请求方法
        //请求调用接口
        try {
          const res = await login(this.user)
          //处理响应结果
          console.log(res)
          this.$toast.success('登录成功')
        } catch (error) {
          console.log('登录失败', error)
          this.$toast.fail('登录失败，手机号或验证码错误')
        }
      },
      //验证失败
      onFailed (error) {
        if (error.errors[0]) {
          this.$toast({
            message: error.errors[0].message,//提示消息
            position: 'top'//防止手机键盘太高，看不见消息
          })
        }
      }
    },
  }
</script>

<style scoped lang="less">
  .login-container {
    .send-btn {
      width: 76px;
      height: 23px;
      background-color: #ededed;

      .van-button__text {
        font-size: 11px;
        color: #666;
      }
    }

    .login-btn-wrap {
      padding: 26px 16px;

      .login-btn {
        background-color: #6db4fb;
        border: none;

        .van-button__text {
          font-size: 15px;
        }
      }
    }
  }
</style>
