/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from './router/index'

// Composables
import { createApp } from 'vue'
import axiosPlugin from './plugins/axiosPlugin'

const app = createApp(App)

registerPlugins(app)

app.use(router)
app.use(axiosPlugin);

app.provide('$env', import.meta.env);
app.config.globalProperties.$env = import.meta.env;
// ApiService.init()

app.mount('#app')
