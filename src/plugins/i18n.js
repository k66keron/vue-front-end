// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const messages = {
  EN: {
    no: 'No',
    customer: 'Customer',
    customerName: 'Customer name',
    status: 'Status',
    action: 'Action',
    name: 'Name',
    surname: 'Surname',
    email: 'E-mail',
    phone: 'Phone',
    address: 'Address',
    register: 'Register',
    reset: 'Reset',
    ok: 'Ok',
    cancel: 'Cancel',
    placeholder: {
      name: 'Please insert Name',
      surname: 'Please insert Surname',
      email: 'Please insert E-mail',
      phone: 'Please insert Phone',
      ext: 'ext',
      address: 'Please insert Address',
      emailType: 'Incorrect email format',
      search: 'Search',
    },
    emailExist: 'This email exists',
    editInfo: 'Edit Info',
    removeCustomer: 'Remove Customer',
    info: 'Info',
    remove: 'Remove',
    fromCustomerList: 'from Customer list',
    list: 'List',
    invoices: 'Invoices',
    //
    totalResult: 'Total result',
    noResult: 'Empty Result',
    //
    menu: {
      home: 'Home',
      customer: 'Customer',
      register: 'Register',
      list: 'List',
      invoices: 'Invoices',
      expand: 'Expand',
    },
    //
    gotMessege: 'You have {text} new messages',
    seeAllMessages: 'See All Messages',
    //
    inbox: 'Inbox',
    profile: 'Profile',
    logout: 'Logout',
  },
  TH: {
    no: 'ลำดับ',
    customer: 'ผู้ใช้บริการ',
    customerName: 'ชื่อผู้ใช้บริการ',
    status: 'สถานะ',
    action: 'การทำงาน',
    name: 'ชื่อ',
    surname: 'นามสกุล',
    email: 'อีเมล',
    phone: 'เบอร์ติดต่อ',
    address: 'ที่อยู่',
    register: 'ลงทะเบียน',
    reset: 'ล้างข้อมูล',
    ok: 'ตกลง',
    cancel: 'ยกเลิก',
    placeholder: {
      name: 'กรุณากรอก ชื่อ',
      surname: 'กรุณากรอก นามสกุล',
      email: 'กรุณากรอก อีเมล',
      phone: 'กรุณากรอก เบอร์ติดต่อ',
      ext: 'เบอร์ต่อ',
      address: 'กรุณากรอก ที่อยู่',
      emailType: 'รูปแบบอีเมล ไม่ถูกต้อง',
      search: 'ค้นหา',
    },
    emailExist: 'อีเมลซ้ำในระบบ',
    editInfo: 'แก้ไขข้อมูล',
    removeCustomer: 'ลบข้อมูลผู้ใช้บริการ',
    info: 'ข้อมูล',
    remove: 'ลบ',
    fromCustomerList: 'ออกจาก รายการผู้ใช้บริการ',
    list: 'รายการ',
    invoices: 'ใบกำกับภาษี',
    //
    totalResult: 'รายการทั้งหมด',
    noResult: 'ไม่พบข้อมูล',
    //
    menu: {
      home: 'หน้าหลัก',
      customer: 'ผู้ใช้บริการ',
      register: 'ลงทะเบียน',
      list: 'รายการ',
      invoices: 'ใบกำกับภาษี',
      expand: 'ส่วนขยาย',
    },
    //
    gotMessege: 'คุณได้รับข้อความ {text} ข้อความ',
    seeAllMessages: 'ดูข้อความทั้งหมด',
    //
    inbox: 'กล่องข้อความ',
    profile: 'ข้อมูลส่วนบุคคล',
    logout: 'ออกจากระบบ',
  },
}
const i18n = new VueI18n({
  locale: 'EN',
  fallbackLocale: 'EN',
  messages,
})
export default i18n
