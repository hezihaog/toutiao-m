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
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        center
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        icon-prefix="toutiao"
        center
        clearable
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code">
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="small"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms">
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
  import { login, sendSms } from '@/api/user'

  export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
      return {
        user: {
          mobile: '13922222222',//手机号
          code: '246810'//验证码
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
        },
        //是否显示倒计时
        isCountDownShow: false,
        //发送验证码按钮的Loading状态
        isSendSmsLoading: false
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
          const { data } = await login(this.user)
          //处理响应结果
          this.$toast.success('登录成功')
          //将后端返回的用户登录状态（token等数据）放到vuex容器中
          this.$store.commit('setUser', data.data)

          //登录成功，跳转回原来的页面
          this.$router.back()//先用这种方式，但是它不太好
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
      },
      //发送验证码
      async onSendSms () {
        //通过ref获取form表单，再通过内部子表单的name属性获取该表单的验证
        try {
          //校验手机号码
          await this.$refs['login-form'].validate('mobile')
          //展示按钮的Loading状态，防止网络慢，用户多次点击触发多次发送行为
          this.isSendSmsLoading = true
          //验证通过，则请求发送验证码
          const res = await sendSms(this.user.mobile)
          console.log(res)
          //隐藏发送按钮，显示倒计时
          this.isCountDownShow = true
          //监视倒计时的 finish 事件，当倒计时结束时，隐藏倒计时，显示发送按钮
        } catch (error) {
          //因为表单验证错误和后端返回的错误都会走到这个catch块，所以需要判断一下，提示不同的错误信息
          console.dir(error)
          let message = ''
          if (error && error.response && error.response.status === 429) {
            //发送太频繁的错误提示
            message = '发送太频繁了，请稍后重试'
          } else if (error.name === 'mobile') {
            //表单验证失败的错误提示
            message = error.message
          } else {
            //未知错误
            message = '发送失败，请稍后重试'
          }
          //提示用户
          this.$toast({
            message,
            position: 'top'
          })
        }
        //成功或失败，都将发送短信按钮的Loading状态取消
        this.isSendSmsLoading = false
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
