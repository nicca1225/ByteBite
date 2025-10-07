import { createApp, h } from 'vue'
import Toast from '@/components/Toast.vue'

let toastContainer = null

export function showToast(message, type = 'info', duration = 4000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.id = 'toast-container'
    document.body.appendChild(toastContainer)
  }

  const toastDiv = document.createElement('div')
  toastContainer.appendChild(toastDiv)

  const app = createApp({
    render() {
      return h(Toast, {
        message,
        type,
        duration,
        onClose: () => {
          app.unmount()
          toastContainer.removeChild(toastDiv)
        }
      })
    }
  })

  app.mount(toastDiv)
}
