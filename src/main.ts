// VUE
import { createApp } from 'vue'

// APP
import App from './App.vue'

// ROUTER
import router from './router'

// STYLES
import './assets/tailwind.css'

// FONTAWESOME
import './icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
