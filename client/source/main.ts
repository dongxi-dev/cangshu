import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import client from '@j-l/request'
import 'element-plus/dist/index.css'
import DefaultLayout from '~/layouts/default.vue'
import routes from '~/routes'
import { API_BASE_URL } from '~/constants'

client.config({
  base: API_BASE_URL,
  contentType: 'json',
  responseType: 'json',
  withCredentials: true,
  timeout: 600,
  onResponse(response) {
    if (response.status === 401) {
      ElMessage('未登录')
      setTimeout(() => {
        routes.push('/login')
      }, 300)
    }
    if (response.status > 399) {
      ElMessage('失败')
      throw new Error('请求异常')
    }
    return response.body
  },
})

createApp(DefaultLayout)
  .use(createPinia())
  .use(routes)
  .use(ElementPlus)
  .mount('#app')
