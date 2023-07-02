import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { routes, type RouteRecord } from '~/routes'

interface MenuData {
  menu: RouteRecord []
}

export const menus = defineStore(
  'menu',
  () => {
    const menu = reactive<MenuData>({ menu: routes[0].children })

    return { ...toRefs(menu) }
  }
)
