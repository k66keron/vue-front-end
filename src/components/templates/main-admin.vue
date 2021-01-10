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
          <router-link to="/">Home</router-link>
        </li>
        <li
          class="expand-menu"
          :class="currentPage.path.includes('/customer') ? 'active' : ''"
          @click="$event.target.classList.toggle('active')"
        >
          <a>Customer [Vuex]<b-icon-caret-left-fill /></a>
          <ul class="menu">
            <li
              :class="
                currentPage.name.includes('FormsRegisterCustomer')
                  ? 'active'
                  : ''
              "
            >
              <router-link to="/customer/register">Register</router-link>
            </li>
            <!-- <li
              :class="currentPage.name.includes('ListCustomer') ? 'active' : ''"
            >
              <router-link to="/customer/list">List</router-link>
            </li> -->
          </ul>
        </li>
        <li :class="currentPage.name.includes('Invoices') ? 'active' : ''">
          <router-link to="/invoices">Invoices [RESTfulAPI]</router-link>
        </li>
        <li
          class="expand-menu"
          :class="currentPage.path.includes('/bootstrap-vue') ? 'active' : ''"
          @click="$event.target.classList.toggle('active')"
        >
          <a>Expand 2<b-icon-caret-left-fill /></a>
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
              <a>Expand 3<b-icon-caret-left-fill /></a>
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
        <!-- <li :class="currentPage.name.includes('About') ? 'active' : ''">
                    <router-link to="/about">About</router-link>
                </li> -->
      </ul>
      <div class="footer">Copyright ©2020 All rights reserved</div>
    </div>
    <div class="wrapper">
      <b-navbar class="navbar-custom sticky">
        <a class="btn-leftbar-collapse float-left" @click="leftBar = !leftBar">
          <b-icon-list />
        </a>
        <b-navbar-nav class="ml-auto float-right">
          <b-nav-item class="nav-icon" @click="onToast()">
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
              >You have 2 new messages
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
            <b-dropdown-item class="text-center"
              >See All Messages</b-dropdown-item
            >
          </b-dropdown>
          <b-dropdown class="dropdown-user" right no-caret>
            <template v-slot:button-content>
              <img class="avatar-icon" src="@/assets/image/avatar.png" />
            </template>
            <b-dropdown-item href="#"
              ><b-icon-envelope /><b-badge class="primary-badge">2</b-badge>
              <span class="ml-1">Inbox</span></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><b-icon-gear />
              <span class="ml-1">Preference</span></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><b-icon-power />
              <span class="ml-1" @click="onLogOut()"
                >Logout</span
              ></b-dropdown-item
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
export default {
  name: 'MainAdmin',
  data() {
    return {
      path: '',
      leftBar: true,
    }
  },
  computed: {
    currentPage() {
      //   document.querySelectorAll('.expand-menu.active').forEach(obj => obj.classList.remove('active'))
      return this.$route
    },
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
      //   console.log(JSON.parse(localStorage.getItem('epro')))
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
