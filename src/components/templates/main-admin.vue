<template>
  <div :class="leftBar ? '' : 'hide-leftBar'">
    <div class="left-side">
      <div class="nav-logo">
        <a href="/">
          <img src="@/assets/image/logo.png" />
        </a>
      </div>
      <!-- <div class="avatar">
        <img class="avatar-img" src="@/assets/image/avatar.png"/>
      </div> -->
      <ul class="menu mt-2">
        <li :class="currentPage.name.includes('HelloWorld') ? 'active' : ''">
          <router-link to="/">{{ $t('menu.home') }}</router-link>
        </li>
        <li
          class="expand-menu"
          :class="currentPage.path.includes('/customer') ? 'active' : ''"
          @click="$event.target.classList.toggle('active')"
        >
          <a>{{ $t('menu.customer') }} [Vuex]<b-icon-caret-left-fill /></a>
          <ul class="menu">
            <li
              :class="
                currentPage.name.includes('FormsRegisterCustomer')
                  ? 'active'
                  : ''
              "
            >
              <router-link to="/customer/register">{{
                $t('menu.register')
              }}</router-link>
            </li>
          </ul>
        </li>
        <li :class="currentPage.name.includes('Invoices') ? 'active' : ''">
          <router-link to="/invoices"
            >{{ $t('menu.invoices') }} [RESTfulAPI]</router-link
          >
        </li>
        <li
          class="expand-menu"
          :class="currentPage.path.includes('/bootstrap-vue') ? 'active' : ''"
          @click="$event.target.classList.toggle('active')"
        >
          <a>{{ $t('menu.expand') }} 2<b-icon-caret-left-fill /></a>
          <ul class="menu">
            <li :class="currentPage.name === 'BTable' ? 'active' : ''">
              <router-link to="/bootstrap-vue/b-table"
                >[404 Page not found]</router-link
              >
            </li>

            <li
              class="expand-menu"
              :class="
                currentPage.path.includes('/bootstrap-vue') ? 'active' : ''
              "
            >
              <a>{{ $t('menu.expand') }} 3<b-icon-caret-left-fill /></a>
              <ul class="menu">
                <li :class="currentPage.name === 'BTable' ? 'active' : ''">
                  <router-link to="/bootstrap-vue/b-table"
                    >[404 Page not found]</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <div class="footer">Copyright ©2020 All rights reserved</div>
    </div>
    <div class="wrapper">
      <b-navbar class="navbar-custom sticky">
        <a class="btn-leftbar-collapse float-left" @click="leftBar = !leftBar">
          <b-icon-list />
        </a>
        <b-navbar-nav class="ml-auto float-right">
          <b-nav-item
            class="nav-icon"
            @click="localLanguage = localLanguage === 'TH' ? 'EN' : 'TH'"
          >
            {{ localLanguage }}
          </b-nav-item>
          <b-nav-item class="nav-icon">
            <b-icon-bell /><b-badge class="alert-badge">1</b-badge>
          </b-nav-item>
          <b-nav-item class="nav-icon">
            <b-icon-exclamation-triangle /><b-badge class="warning-badge"
              >2</b-badge
            >
          </b-nav-item>
          <b-nav-item class="nav-icon">
            <b-icon-calendar3 /><b-badge class="success-badge">4</b-badge>
          </b-nav-item>
          <b-dropdown class="dropdown-msg" variant="link" right no-caret>
            <template v-slot:button-content>
              <b-icon-envelope /><b-badge class="primary-badge">2</b-badge>
            </template>
            <b-dropdown-text
              >{{ $t('gotMessege', { text: '2' }) }}
              <b-badge class="primary-badge">2</b-badge></b-dropdown-text
            >
            <b-dropdown-item href="#">
              <div class="msg-avatar mr-2">
                <img class="avatar-icon" src="@/assets/image/avatar.png" />
              </div>
              <div class="msg-body">
                <h6 class="msg-title">John Doe</h6>
                <div class="msg-info">Lorem ipsum dolor sit amet...</div>
                <div class="msg-date">Today, 4:10 PM</div>
              </div>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <div class="msg-avatar mr-2">
                <img class="avatar-icon" src="@/assets/image/avatar.png" />
              </div>
              <div class="msg-body">
                <h6 class="msg-title">John Doe</h6>
                <div class="msg-info">Lorem ipsum dolor sit amet...</div>
                <div class="msg-date">Today, 2:25 PM</div>
              </div>
            </b-dropdown-item>
            <b-dropdown-item class="text-center">{{
              $t('seeAllMessages')
            }}</b-dropdown-item>
          </b-dropdown>
          <b-dropdown class="dropdown-user" right no-caret>
            <template v-slot:button-content>
              <img class="avatar-icon" src="@/assets/image/avatar.png" />
            </template>
            <b-dropdown-item href="#"
              ><b-icon-envelope /><b-badge class="primary-badge">2</b-badge>
              <span class="ml-1">{{ $t('inbox') }}</span></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><b-icon-gear />
              <span class="ml-1">{{ $t('profile') }}</span></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><b-icon-power />
              <span class="ml-1" @click="onLogOut()">{{
                $t('logout')
              }}</span></b-dropdown-item
            >
          </b-dropdown>
        </b-navbar-nav>
      </b-navbar>
      <router-view />
      <a id="btn-scrollToTop" @click="scrollToTop"><b-icon-arrow-bar-up /></a>
    </div>
  </div>
</template>
<script>
import { eventBus } from '@/main.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainAdmin',
  data() {
    return {
      path: '',
      leftBar: true,
      localLanguage: '',
    }
  },
  computed: {
    currentPage() {
      return this.$route
    },
    ...mapGetters('language', ['GET_I18N']),
  },
  created() {
    this.localLanguage = this.GET_I18N
  },
  watch: {
    localLanguage(val) {
      this.ADD_I18N(val)
      this.$i18n.locale = val
    },
    deep: true,
  },
  mounted() {
    window.onscroll = function () {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        setTimeout(() => {
          document.getElementById('btn-scrollToTop').classList.add('show')
        }, 100)
      } else {
        setTimeout(() => {
          document.getElementById('btn-scrollToTop').classList.remove('show')
        }, 100)
      }
    }
    this.responsive()
    const _this = this
    window.addEventListener('resize', function () {
      _this.responsive()
    })
  },
  methods: {
    ...mapActions('language', ['ADD_I18N']),
    onToast() {
      eventBus.$emit(
        'on-toast',
        'primary',
        'Title',
        'Go to <a href="https://www.google.co.th" target="_blank">Google</a>'
      )
    },
    scrollToTop: function () {
      const scrollToTop = () => {
        const c = document.documentElement.scrollTop || document.body.scrollTop
        if (c > 0) {
          window.requestAnimationFrame(scrollToTop)
          window.scrollTo(0, c - c / 10)
        }
      }
      scrollToTop()
    },
    responsive() {
      var windowWidth = document.documentElement.clientWidth
      if (windowWidth < 992) {
        this.leftBar = false
      } else {
        this.leftBar = true
      }
    },
    onLogOut() {
      localStorage.removeItem('epro')
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
