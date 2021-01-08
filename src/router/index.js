import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Admin = () =>
  import('@/components/templates/main-admin.vue') /* เรียกการใช้งาน Admin */
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Admin /* กำหนดให้ Component หลักไปใช้งาน Admin */,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/views/index.vue'),
        },
        {
          path: 'invoices',
          name: 'Invoices',
          component: () => import('@/views/invoices/index.vue'),
        },
        {
          path: 'invoices/detail',
          name: 'InvoicesDetail',
          component: () => import('@/views/invoices/detail.vue'),
        },
      ],
    },
    // {
    //   path: '/banners',
    //   name: 'Banners',
    //   component: Admin,
    //   children: [
    //     {
    //       path: 'group',
    //       name: 'BannersGroup',
    //       component: () => import('@/views/banners/group/index.vue'),
    //     },
    //     {
    //       path: 'single',
    //       name: 'BannersSingle',
    //       component: () => import('@/views/banners/single/index.vue'),
    //     },
    //   ],
    // },
    // {
    //   path: '/reports',
    //   name: 'Reports',
    //   component: Admin,
    //   children: [
    //     {
    //       path: 'invoice',
    //       name: 'Reportsinvoice',
    //       component: () => import('@/views/reports/tests/invoice.vue'),
    //     },
    //   ],
    // },
    {
      path: '/customer',
      name: 'Customer',
      component: Admin,
      children: [
        {
          path: 'register',
          name: 'FormsRegisterCustomer',
          component: () => import('@/views/customer/register.vue'),
        },
        {
          path: 'list',
          name: 'ListCustomer',
          component: () => import('@/views/customer/list.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/PageNotFound.vue'),
    },
  ],
})

export default router
