import type { App, Component } from 'vue'

export default {
  install(app: App) {
    const components = import.meta.glob('@/components/UI/*.vue', { eager: true })
    for (const path in components) {
      const component = (components[path] as { default: Component }).default
      const name = path
        .split('/')
        .pop()!
        .replace(/\.\w+$/, '') // убираем расширение
      app.component(name, component)
    }
  },
}
