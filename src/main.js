import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
import App from '@/App.vue'
import router from '@/router'
import '@/styles/base.scss'

Vue.config.productionTip = false

process.env.NODE_ENV === 'production' &&
  Sentry.init({
    dsn: 'https://85d226dc6d0f4648b54e20423e183b3f@o390044.ingest.sentry.io/5230719',
    integrations: [new VueIntegration({ Vue, attachProps: true })],
    release: 'yolkworks-list-source-map'
  })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
