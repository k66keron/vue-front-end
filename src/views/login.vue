<template>
  <div class="login-page">
    <div class="row no-gutters align-items-center">
      <div class="col">
        <div class="row justify-content-center no-gutters">
          <div class="login-box">
            <div
              class="left-bg"
              :style="{
                'background-image':
                  'url(' + require('@/assets/image/26367.jpg') + ')',
              }"
            ></div>
            <div class="login-form">
              <div class="row">
                <div class="col-12">
                  <h4>
                    Log in
                    <div>to continue to Admin template.</div>
                  </h4>
                </div>
                <div class="col-12">
                  <input-text
                    :class="userInfo.username ? 'show-label' : ''"
                    @value="userInfo.username = $event"
                    :defaultValue="userInfo.username"
                    :isEmpty="validateInfo.username"
                    label="Username"
                    vertical
                    maxlength="20"
                  ></input-text>
                </div>
                <div class="col-12">
                  <input-text
                    :class="userInfo.password ? 'show-label' : ''"
                    @value="userInfo.password = $event"
                    :defaultValue="userInfo.password"
                    :isEmpty="validateInfo.password"
                    password
                    :showIconPassword="false"
                    label="Password"
                    vertical
                    maxlength="20"
                  ></input-text>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button
                    class="btn btn-theme btn-width"
                    @click="
                      $_validateForm(
                        'userInfo',
                        'validateInfo',
                        'onSubmitLogin'
                      )
                    "
                  >
                    Login
                  </button>
                </div>
              </div>
              <b-alert
                fade
                dismissible
                :show="dismissCountDown"
                variant="danger"
                style="text-align: left; margin-top: 24px"
                @dismiss-count-down="countDownChanged"
              >
                Test message error. <a href="/">Click Here.</a>
              </b-alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InputText from '@/components/share/input-text'
export default {
  // layout: 'admin',
  name: 'index',
  components: {
    'input-text': InputText,
  },
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
      },
      validateInfo: {
        username: false,
        password: false,
      },
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.$nuxt.$loading.start()
      // setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  watch: {
    // 'userInfo.username': {
    //   handler: function (val) {
    //     console.log(val)
    //   }
    // }
  },
  methods: {
    onSubmitLogin() {
      console.log(this.userInfo)
      this.showAlert()
      // this.$router.push({
      //   path: '/'
      // })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.$nextTick(() => {
        this.validateInfo.username = true
        this.validateInfo.password = true
      })
      this.dismissCountDown = this.dismissSecs
    },
  },
}
</script>
