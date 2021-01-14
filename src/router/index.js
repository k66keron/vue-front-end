import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Admin = () => import('@/components/templates/main-admin.vue')
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Admin,
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
      ],
    },
    {
      path: '*',
      component: () => import('@/views/PageNotFound.vue'),
    },
  ],
})

export default router
